/**
 * main.js - Sorteio Mega-Sena & Auditoria de Acesso
 */

// 1. DEFINIÇÃO DOS PREÇOS (Deve estar no topo do arquivo)
const PRECO_UNITARIO = {
    6: 5.00, 7: 35.00, 8: 168.00, 9: 504.00, 10: 1260.00,
    11: 2772.00, 12: 5544.00, 13: 10296.00, 14: 18018.00, 15: 30030.00,
    16: 48048.00, 17: 74256.00, 18: 111384.00, 19: 162792.00, 20: 232560.00
};

window.onload = function() {
    atualizarDataModificacao();
    obterTotalVisitas();
    dispararWorkflowAcesso();
};

// --- FUNÇÕES DE AUDITORIA ---

function atualizarDataModificacao() {
    const data = new Date(document.lastModified);
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const elemento = document.getElementById('dataUpdate');
    if(elemento) elemento.innerText = `Atualizado em: ${data.toLocaleString('pt-BR', opcoes)}`;
}

async function obterTotalVisitas() {
    try {
        const res = await fetch('https://raw.githubusercontent.com/fagnermacedo/sorteio-megasena/main/acessos.json');
        const dados = await res.json();
        const elemento = document.getElementById('valorVisitas');
        if(elemento) elemento.innerText = dados.total_visitas;
    } catch (e) {
        console.error("Erro ao ler JSON de visitas:", e);
    }
}

async function dispararWorkflowAcesso() {
    const TOKEN = 'SEU_TOKEN_AQUI'; // Lembre-se de colocar seu PAT aqui
    const REPO_URL = 'https://api.github.com/repos/fagnermacedo/sorteio-megasena/dispatches';

    if (TOKEN === 'SEU_TOKEN_AQUI') return;

    try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();

        await fetch(REPO_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                event_type: 'log_acesso',
                client_payload: {
                    ip: ipData.ip,
                    navegador: navigator.userAgent,
                    data: new Date().toLocaleString('pt-BR')
                }
            })
        });
    } catch (e) {
        console.warn("Workflow não disparado.");
    }
}

// --- FUNÇÕES DE LÓGICA (CÁLCULO E SORTEIO) ---

function calcularCusto() {
    const qtdJogosInput = document.getElementById('qtdApostas');
    const numDezenasInput = document.getElementById('numerosPorAposta');
    const qtdCotasInput = document.getElementById('qtdCotas');
    const divResultado = document.getElementById('resultadoCusto');

    const jogos = Number(qtdJogosInput.value);
    const dezenas = Number(numDezenasInput.value);
    const cotas = Number(qtdCotasInput.value) || 1;

    // Verifica se a dezena existe na nossa tabela de preços
    const valorUnitario = PRECO_UNITARIO[dezenas];

    if (!valorUnitario) {
        divResultado.innerHTML = "Selecione entre 6 e 20 dezenas.";
        return;
    }

    const custoTotal = valorUnitario * jogos;
    const valorPorCota = custoTotal / cotas;

    divResultado.innerHTML = `
        <strong>Custo Total:</strong> R$ ${custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <strong>Valor por Cota:</strong> R$ ${valorPorCota.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <small style="color: #82c91e; font-size: 0.7rem;">* ${jogos} jogos de ${dezenas} dezenas.</small>
    `;
}

function sortearNumeros() {
    const totalApostas = Number(document.getElementById('qtdApostas').value) || 1;
    const qtdDezenas = Number(document.getElementById('numerosPorAposta').value) || 6;
    const grid = document.getElementById('gridSorteio');
    
    grid.innerHTML = ""; 

    for (let i = 1; i <= totalApostas; i++) {
        let sorteados = new Set();
        while (sorteados.size < qtdDezenas) {
            sorteados.add(Math.floor(Math.random() * 60) + 1);
        }

        const listaFinal = Array.from(sorteados)
                                .sort((a, b) => a - b)
                                .map(n => n.toString().padStart(2, '0'));
        
        exibirJogoNaTela(i, listaFinal);
    }
}

function exibirJogoNaTela(index, dezenas) {
    const grid = document.getElementById('gridSorteio');
    const containerJogo = document.createElement('div');
    containerJogo.className = 'linha-jogo';

    const spanSeq = document.createElement('span');
    spanSeq.className = 'sequencial';
    spanSeq.innerText = index.toString().padStart(2, '0');
    containerJogo.appendChild(spanSeq);

    dezenas.forEach(dezena => {
        const spanBola = document.createElement('span');
        spanBola.className = 'bola';
        spanBola.innerText = dezena;
        containerJogo.appendChild(spanBola);
    });

    grid.appendChild(containerJogo);
}
