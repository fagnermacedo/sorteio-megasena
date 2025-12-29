// Dados oficiais Loterias Caixa para Bolão
const DADOS_BOLAO = {
    6:  { minBolao: 18.00,  minCota: 7.00 },
    7:  { minBolao: 42.00,  minCota: 8.00 },
    8:  { minBolao: 168.00, minCota: 8.00 },
    9:  { minBolao: 504.00, minCota: 8.00 },
    10: { minBolao: 1260.00, minCota: 12.60 },
    11: { minBolao: 2772.00, minCota: 27.72 },
    12: { minBolao: 5544.00, minCota: 55.44 },
    13: { minBolao: 10296.00, minCota: 102.96 },
    14: { minBolao: 18018.00, minCota: 180.18 },
    15: { minBolao: 30030.00, minCota: 300.30 },
    16: { minBolao: 48048.00, minCota: 480.48 },
    17: { minBolao: 74256.00, minCota: 742.56 },
    18: { minBolao: 111384.00, minCota: 1113.84 },
    19: { minBolao: 162792.00, minCota: 1627.92 },
    20: { minBolao: 232560.00, minCota: 2325.60 }
};

function calcularCusto() {
    const numDezenas = Number(numerosPorAposta.value);
    const cotas = Number(qtdCotas.value);
    const dados = DADOS_BOLAO[numDezenas];

    if (!dados) {
        resultadoCusto.innerHTML = "Escolha entre 6 e 20 números.";
        return;
    }

    // No Bolão oficial, o custo total é fixo pela quantidade de dezenas escolhidas
    const custoTotal = dados.minBolao;
    const valorPorCota = custoTotal / cotas;

    resultadoCusto.innerHTML = `
        <strong>Custo Mínimo do Bolão:</strong> R$ ${custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <strong>Valor por Cota:</strong> R$ ${valorPorCota.toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
        <small style="color: #82c91e">*Valores sugeridos conforme tabela Caixa.</small>
    `;
}

function sortearNumeros() {
    const qtdJogos = Number(qtdApostas.value) || 1;
    const qtdDezenas = Number(numerosPorAposta.value) || 6;
    const grid = document.getElementById('resultadoSorteioGrid');
    
    grid.innerHTML = ""; 

    for (let i = 1; i <= qtdJogos; i++) {
        let numeros = new Set();
        while (numeros.size < qtdDezenas) {
            const n = Math.floor(Math.random() * 60) + 1;
            numeros.add(n);
        }

        const listaOrdenada = Array.from(numeros).sort((a, b) => a - b)
                                   .map(n => n.toString().padStart(2, '0'));
        
        renderizarLinhaJogo(i, listaOrdenada);
    }
}

function renderizarLinhaJogo(index, dezenas) {
    const grid = document.getElementById('resultadoSorteioGrid');
    const linha = document.createElement('div');
    linha.className = 'linha-jogo';

    const seq = document.createElement('span');
    seq.className = 'sequencial';
    seq.innerText = index.toString().padStart(2, '0');
    linha.appendChild(seq);

    dezenas.forEach(d => {
        const bola = document.createElement('span');
        bola.className = 'bola';
        bola.innerText = d;
        linha.appendChild(bola);
    });

    grid.appendChild(linha);
}
