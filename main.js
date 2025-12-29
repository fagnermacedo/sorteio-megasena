// ====================== TABELA DE REGRAS DO BOLÃO ======================
const regrasBolao = {
  6: { apostas: 1, minCotas: 2, maxCotas: 8, minCota: 7, minBolao: 18 },
  7: { apostas: 7, minCotas: 2, maxCotas: 50, minCota: 8, minBolao: 42 },
  8: { apostas: 28, minCotas: 2, maxCotas: 100, minCota: 8, minBolao: 168 },
  9: { apostas: 84, minCotas: 2, maxCotas: 100, minCota: 8, minBolao: 504 },
  10: { apostas: 210, minCotas: 2, maxCotas: 100, minCota: 12.6, minBolao: 1260 },
  11: { apostas: 462, minCotas: 2, maxCotas: 100, minCota: 27.72, minBolao: 2772 },
  12: { apostas: 924, minCotas: 2, maxCotas: 100, minCota: 55.44, minBolao: 5544 },
  13: { apostas: 1716, minCotas: 2, maxCotas: 100, minCota: 102.96, minBolao: 10296 },
  14: { apostas: 3003, minCotas: 2, maxCotas: 100, minCota: 180.18, minBolao: 18018 },
  15: { apostas: 5005, minCotas: 2, maxCotas: 100, minCota: 300.3, minBolao: 30030 },
};

// ====================== FUNÇÕES AUXILIARES ======================
function limparErros() {
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("erro");
  });
  document.querySelectorAll(".erro-info").forEach((msg) => {
    msg.style.display = "none";
  });
}

function marcarErro(idCampo, idMensagem, texto) {
  const campo = document.getElementById(idCampo);
  const mensagem = document.getElementById(idMensagem);

  campo.classList.add("erro");
  mensagem.textContent = texto;
  mensagem.style.display = "block";
}

// ====================== CÁLCULO DO BOLÃO ======================
function calcularCustoBolao() {
  limparErros();

  const numApostas = parseInt(document.getElementById("numApostas").value);
  const numNumeros = parseInt(document.getElementById("numNumeros").value);
  const numCotas = parseInt(document.getElementById("numCotas").value);

  let valido = true;

  // Validação básica
  if (isNaN(numNumeros) || numNumeros < 6 || numNumeros > 15) {
    marcarErro(
      "numNumeros",
      "erroNumeros",
      "Quantidade de números deve estar entre 6 e 15."
    );
    valido = false;
  }

  if (!regrasBolao[numNumeros]) {
    valido = false;
  }

  const regra = regrasBolao[numNumeros];

  // Validação de apostas
  if (isNaN(numApostas) || numApostas < 1 || numApostas > 10) {
    marcarErro(
      "numApostas",
      "erroApostas",
      "O bolão pode ter no máximo 10 apostas."
    );
    valido = false;
  }

  // Validação de cotas
  if (
    isNaN(numCotas) ||
    numCotas < regra.minCotas ||
    numCotas > regra.maxCotas
  ) {
    marcarErro(
      "numCotas",
      "erroCotas",
      `Para ${numNumeros} números, o bolão deve ter entre ${regra.minCotas} e ${regra.maxCotas} cotas.`
    );
    valido = false;
  }

  if (!valido) return;

  // ====================== CÁLCULO ======================
  const custoTotal = regra.minBolao * numApostas;
  const custoPorCota = custoTotal / numCotas;

  document.getElementById("resultado").value =
    `Custo total do Bolão: R$ ${custoTotal.toFixed(2)}\n` +
    `Valor por Cota: R$ ${custoPorCota.toFixed(2)}`;
}

// ====================== SORTEIO DE NÚMEROS ======================
function sortearNumero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let contadorJogo = 1;

function sortearNumeros() {
  const numeroInicial = parseInt(document.getElementById("numeroInicial").value);
  const numeroFinal = parseInt(document.getElementById("numeroFinal").value);
  const total = parseInt(document.getElementById("numeroTotalJogo").value);

  if (
    isNaN(numeroInicial) ||
    isNaN(numeroFinal) ||
    isNaN(total) ||
    numeroInicial > numeroFinal ||
    total < 6 ||
    total > 20
  ) {
    return;
  }

  let numeros = [];

  while (numeros.length < total) {
    const n = sortearNumero(numeroInicial, numeroFinal);
    if (!numeros.includes(n)) numeros.push(n);
  }

  numeros.sort((a, b) => a - b);

  const resultado = document.getElementById("resultado1");
  resultado.value += `Jogo ${contadorJogo}: ${numeros.join(", ")}\n`;
  contadorJogo++;
}
