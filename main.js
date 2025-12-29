// Calcular custo Bolão **********************************************
function calcularCusto(numNumeros) {
  const tabelaPrecos = {
    6: 6,
    7: 42,
    8: 168.0,
    9: 504.0,
    10: 1260.0,
    11: 2772.0,
    12: 5544.0,
    13: 10296.0,
    14: 18018.0,
    15: 30030.0,
  };
  return tabelaPrecos[numNumeros] || 0;
}

function calcularCustoBolao() {
  let numApostas = parseInt(document.getElementById("numApostas").value);
  let numNumeros = parseInt(document.getElementById("numNumeros").value);
  let numCotas = parseInt(document.getElementById("numCotas").value);

  if (
    isNaN(numApostas) ||
    isNaN(numNumeros) ||
    numNumeros < 6 ||
    numNumeros > 15
  ) {
    alert(
      "Por favor, insira valores válidos. O número de números por aposta deve estar entre 6 e 15."
    );
    return;
  }

  let custoPorAposta = calcularCusto(numNumeros);
  let custoTotal = numApostas * custoPorAposta;
  let custoPorCota = custoTotal / numCotas;

  document.getElementById("resultado").value =
    "Custo Total do Bolão: R$ " + custoTotal.toFixed(2) + "\n";
  document.getElementById("resultado").value +=
    "Custo por Cota no Bolão: R$ " + custoPorCota.toFixed(2);
}

//##############################################################################################

function sortearNumero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let contadorJogo = 1;

function sortearNumeros() {
  let numeroInicial = parseInt(document.getElementById("numeroInicial").value);
  let numeroFinal = parseInt(document.getElementById("numeroFinal").value);
  let numeroTotaldeJogos = parseInt(
    document.getElementById("numeroTotalJogo").value
  );

  if (
    isNaN(numeroInicial) ||
    isNaN(numeroFinal) ||
    isNaN(numeroTotaldeJogos) ||
    numeroInicial > numeroFinal ||
    numeroTotaldeJogos < 6 ||
    numeroTotaldeJogos > 15
  ) {
    alert(
      "Por favor, insira valores válidos e certifique-se de que o número inicial é menor ou igual ao número final."
    );
    return;
  }

  let numerosSorteados = [];

  // Sorteio sem repetição
  while (numerosSorteados.length < numeroTotaldeJogos) {
    let numero = sortearNumero(numeroInicial, numeroFinal);

    if (!numerosSorteados.includes(numero)) {
      numerosSorteados.push(numero);
    }
  }

  // Ordena os números
  numerosSorteados.sort((a, b) => a - b);

  // Exibe no textarea
  let resultadoTextarea = document.getElementById("resultado1");
  resultadoTextarea.value +=
    `Jogo: ${contadorJogo}º:   ` +
    numerosSorteados.join(", ") +
    "\n";

  contadorJogo++;
}
