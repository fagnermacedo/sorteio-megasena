// Preços oficiais da Caixa para 1 JOGO (Recibo)
const PRECO_UNITARIO = {
    6: 5.00, 7: 35.00, 8: 168.00, 9: 504.00, 10: 1260.00,
    11: 2772.00, 12: 5544.00, 13: 10296.00, 14: 18018.00, 15: 30030.00,
    16: 48048.00, 17: 74256.00, 18: 111384.00, 19: 162792.00, 20: 232560.00
};

function limparErros() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("erro");
    });
}

function calcularCusto() {
    limparErros();

    const jogos = Number(document.getElementById('qtdApostas').value);
    const dezenas = Number(document.getElementById('numerosPorAposta').value);
    const cotas = Number(document.getElementById('qtdCotas').value);

    if (!PRECO_UNITARIO[dezenas]) {
        document.getElementById('resultadoCusto').innerHTML = "Selecione entre 6 e 20 números.";
        return;
    }

    // Lógica corrigida: Preço de um jogo (ex: 168,00) * quantidade de jogos (ex: 8)
    const custoTotal = PRECO_UNITARIO[dezenas] * jogos;
    const valorPorCota = custoTotal / cotas;

    document.getElementById('resultadoCusto').innerHTML = `
        <strong>Custo Total:</strong> R$ ${custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <strong>Valor por Cota:</strong> R$ ${valorPorCota.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <small style="color: #82c91e; font-size: 0.75rem;">*Referente a ${jogos} jogos de ${dezenas} números.</small>
    `;
}

function sortearNumeros() {
    const totalJogos = Number(document.getElementById('qtdApostas').value) || 1;
    const dezenasPorJogo = Number(document.getElementById('numerosPorAposta').value) || 6;
    const grid = document.getElementById('gridSorteio');
    
    grid.innerHTML = ""; // Limpa resultados anteriores

    for (let i = 1; i <= totalJogos; i++) {
        let numeros = new Set();
        while (numeros.size < dezenasPorJogo) {
            const n = Math.floor(Math.random() * 60) + 1;
            numeros.add(n);
        }

        const listaOrdenada = Array.from(numeros).sort((a, b) => a - b)
                                   .map(n => n.toString().padStart(2, '0'));
        
        exibirJogoNoGrid(i, listaOrdenada);
    }
}

function exibirJogoNoGrid(index, dezenas) {
    const grid = document.getElementById('gridSorteio');
    const linha = document.createElement('div');
    linha.className = 'linha-jogo';

    // Número sequencial do jogo (01, 02...)
    const seq = document.createElement('span');
    seq.className = 'sequencial';
    seq.innerText = index.toString().padStart(2, '0');
    linha.appendChild(seq);

    // Bolas numeradas
    dezenas.forEach(d => {
        const bola = document.createElement('span');
        bola.className = 'bola';
        bola.innerText = d;
        linha.appendChild(bola);
    });

    grid.appendChild(linha);
}
