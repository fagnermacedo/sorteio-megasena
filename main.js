function limparErros() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("erro");
    });
}

function calcularCusto() {
    limparErros();

    const apostas = Number(qtdApostas.value);
    const numeros = Number(numerosPorAposta.value);
    const cotas = Number(qtdCotas.value);

    let valido = true;

    if (apostas < 1 || apostas > 10) {
        qtdApostas.classList.add("erro");
        valido = false;
    }

    if (numeros < 6 || numeros > 15) {
        numerosPorAposta.classList.add("erro");
        valido = false;
    }

    if (cotas <= 0) {
        qtdCotas.classList.add("erro");
        valido = false;
    }

    if (!valido) {
        resultadoCusto.innerHTML = "Corrija os campos destacados.";
        return;
    }

    const custoPorAposta = numeros * 10;
    const custoTotal = custoPorAposta * apostas;
    const valorPorCota = custoTotal / cotas;

    resultadoCusto.innerHTML = `
        Custo total: R$ ${custoTotal.toFixed(2)}<br>
        Valor por cota: R$ ${valorPorCota.toFixed(2)}
    `;
}

function sortearNumeros() {
    limparErros();

    const inicio = Number(numeroInicial.value);
    const fim = Number(numeroFinal.value);
    const qtdNumeros = Number(numerosPorAposta.value);

    let valido = true;

    if (inicio >= fim) {
        numeroInicial.classList.add("erro");
        numeroFinal.classList.add("erro");
        valido = false;
    }

    if (!valido) {
        resultadoSorteio.value = "Corrija os campos destacados.";
        return;
    }

    let numeros = new Set();

    while (numeros.size < qtdNumeros) {
        const n = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
        numeros.add(n);
    }

    const listaOrdenada = Array.from(numeros).sort((a, b) => a - b);

    resultadoSorteio.value = listaOrdenada.join(" - ");
}
