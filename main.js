/**
 * main.js - Sorteio Mega-Sena & Auditoria de Acesso
 * Desenvolvido para: Fagner Sá

// Tabela oficial de preços (Recibo Unitário)
const PRECO_UNITARIO = {
    6: 5.00, 7: 35.00, 8: 168.00, 9: 504.00, 10: 1260.00,
    11: 2772.00, 12: 5544.00, 13: 10296.00, 14: 18018.00, 15: 30030.00,
    16: 48048.00, 17: 74256.00, 18: 111384.00, 19: 162792.00, 20: 232560.00
};

// Executa ao carregar a página
window.onload = function() {
    atualizarDataModificacao();
    obterTotalVisitas();
    dispararWorkflowAcesso();
};

/**
 * 1. LOGICA DE AUDITORIA E CONTADOR
 */

function atualizarDataModificacao() {
    const data = new Date(document.lastModified);
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('dataUpdate').innerText = `Atualizado em: ${data.toLocaleString('pt-BR', opcoes)}`;
}

async function obterTotalVisitas() {
    try {
        // Busca o total direto do arquivo JSON no repositório
        const res = await fetch('https://raw.githubusercontent.com/fagnermacedo/sorteio-megasena/main/acessos.json');
        const dados = await res.json();
        document.getElementById('valorVisitas').innerText = dados.total_visitas;
    } catch (e) {
        console.error("Erro ao ler JSON de visitas:", e);
        document.getElementById('valorVisitas').innerText = "0";
    }
}

async function dispararWorkflowAcesso() {
    // ATENÇÃO: Substitua pelo seu Token ou use uma Secret se estiver usando Proxy
    const TOKEN = 'SEU_TOKEN_AQUI'; 
    const REPO_URL = 'https://api.github.com/repos/fagnermacedo/sorteio-megasena/dispatches';

    try {
        // Obtém IP do visitante para o log
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();

        // Dispara o evento 'log_acesso' para o Workflow contador.yml
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
        console.warn("Workflow não disparado (Token ausente ou erro de rede).");
    }
}

/**
 * 2. LOGICA DE NEGÓCIO (BOLÃO E SORTEIO)
 */

function calcularCusto() {
    const qtdJogos = Number(document.getElementById('qtdApostas').value) || 0;
    const dezenasPorJogo = Number(document.getElementById('numerosPorAposta').value) || 6;
    const cotas = Number(document.getElementById('qtdCotas').value) || 1;

    const valorUnitario = PRECO_UNITARIO[dezenasPorJogo] || 0;
    
    // Cálculo: (Valor de 1 jogo de N dezenas) * Quantidade de jogos
    const custoTotal = valorUnitario * qtdJogos;
    const valorPorCota = custoTotal / cotas;

    const divResultado = document.getElementById('resultadoCusto');

    if (custoTotal === 0) {
        divResultado.innerHTML = "Selecione valores válidos (6 a 20 dezenas).";
        return;
    }

    divResultado.innerHTML = `
        <strong>Custo Total:</strong> R$ ${custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <strong>Valor por Cota:</strong> R$ ${valorPorCota.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <small style="color: #82c91e; font-size: 0.7rem;">
            * Calculado para ${qtdJogos} apostas de ${dezenasPorJogo} números cada.
        </small>
    `;
}

function sortearNumeros() {
    const totalApostas = Number(document.getElementById('qtdApostas').value) || 1;
    const qtdDezenas = Number(document.getElementById('numerosPorAposta').value) || 6;
    const grid = document.getElementById('gridSorteio');
    
    grid.innerHTML = ""; // Limpa a tela

    for (let i = 1; i <= totalApostas; i++) {
        let sorteados = new Set();
        while (sorteados.size < qtdDezenas) {
            const num = Math.floor(Math.random() * 60) + 1;
            sorteados.add(num);
        }

        // Ordenar e formatar com zero à esquerda (ex: 05)
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

    // Sequencial (01, 02...)
    const spanSeq = document.createElement('span');
    spanSeq.className = 'sequencial';
    spanSeq.innerText = index.toString().padStart(2, '0');
    containerJogo.appendChild(spanSeq);

    // Cria as bolinhas brancas
    dezenas.forEach(dezena => {
        const spanBola = document.createElement('span');
        spanBola.className = 'bola';
        spanBola.innerText = dezena;
        containerJogo.appendChild(spanBola);
    });

    grid.appendChild(containerJogo);
}
