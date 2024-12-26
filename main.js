// Calcular custo Bolão **********************************************

function calcularCusto(numNumeros) {
    const tabelaPrecos = {
      6: 6,
      7: 35,
      8: 140.0,
      9: 420.0,
      10: 1050.0,
      11: 2310.0,
      12: 4620.0,
      13: 8580.0,
      14: 15015.0,
      15: 25025.0,
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
    let custoPorCota = custoTotal /numCotas;
    document.getElementById("resultado").value = "Custo Total do Bolão: R$ " + custoTotal.toFixed(2) + "\n";
    document.getElementById("resultado").value += "Custo por Cota no Bolão: R$ " + custoPorCota.toFixed(2);
  }
  

//##############################################################################################

function sortearNumero(min, max) {
  // Gera um número aleatório entre min e max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let contadorJogo = 1;

function sortearNumeros() {
  // Obtém os valores dos campos de entrada
  let numeroInicial = parseInt(document.getElementById("numeroInicial").value);
  let numeroFinal = parseInt(document.getElementById("numeroFinal").value);
  let numeroTotaldeJogos = parseInt(
    document.getElementById("numeroTotalJogo").value
  );

  // Verifica se os valores são válidos
  if (
    isNaN(numeroInicial) ||
    isNaN(numeroFinal) ||
    isNaN(numeroTotaldeJogos) ||
    numeroInicial > numeroFinal ||
    numeroTotaldeJogos <= 6 ||
    numeroTotaldeJogos >= 15
  ) {
    alert(
      "Por favor, insira valores válidos e certifique-se de que o número inicial é menor ou igual ao número final."
    );
    return;
  }

  let numerosSorteados = [];
//   console.log(numeroTotaldeJogos); //Teste
  for (let i = 0; i < numeroTotaldeJogos; i++) {
    numerosSorteados.push(sortearNumero(numeroInicial, numeroFinal));
  }

  // Adiciona os números sorteados ao conteúdo existente do textarea
  let resultadoTextarea = document.getElementById("resultado1");
//   console.log("Saida text area ",+ resultadoTextarea); //Teste
  resultadoTextarea.value += (`Jogo: ${contadorJogo}º:   `) +numerosSorteados.join(", ") + "\n";
  contadorJogo++;
}