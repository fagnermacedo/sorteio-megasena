// ====================== REGRAS DO BOLÃO ======================
const regrasBolao = {
  6: { minCotas: 2, maxCotas: 8, minBolao: 18 },
  7: { minCotas: 2, maxCotas: 50, minBolao: 42 },
  8: { minCotas: 2, maxCotas: 100, minBolao: 168 },
  9: { minCotas: 2, maxCotas: 100, minBolao: 504 },
  10: { minCotas: 2, maxCotas: 100, minBolao: 1260 },
  11: { minCotas: 2, maxCotas: 100, minBolao: 2772 },
  12: { minCotas: 2, maxCotas: 100, minBolao: 5544 },
  13: { minCotas: 2, maxCotas: 100, minBolao: 10296 },
  14: { minCotas: 2, maxCotas: 100, minBolao: 18018 },
  15: { minCotas: 2, maxCotas: 100, minBolao: 30030 },
};

// ====================== FUNÇÕES DE ERRO ======================
function limparErros() {
  document.querySelectorAll("input").forEach((i) => i.classList.remove("erro"));
  document.querySelectorAll(".erro-info").forEach((e) => (e.style.display = "none"));
}

function erro(campo, msgId, texto) {
  document.getElementById(campo).classList.add("erro");
  const msg = document.getElementById(msgId);
  msg.textContent = texto;
  msg.style.display = "block";
}

// ====================== CÁLCULO ======================
function calcularCustoBolao() {
  limparErros();

  const apostas = parseInt(document.getElementById("numApostas").value);
  const numeros = parseInt(document.getElementById("numNumeros").value);
  const cotas = parseInt(document.getElementById("numCotas").value);

  let valido = true;

  if (isNaN(apostas) || apostas < 1 || apostas > 10) {
    erro("numApostas", "erroApostas", "Máximo permitido: 10 apostas.");
    valido = false;
  }

  if (isNaN(numeros) || numeros < 6 || numeros > 15) {
    erro("numNumeros", "erroNumeros", "Escolha entre 6 e 15 números.");
    valido = false;
  }

  if (!regrasBolao[numeros]) valido = false;

  const regra = regrasBolao[numeros];

  if (isNaN(cotas) || cotas < regra.minCotas || cotas > regra.maxCotas) {
    erro(
      "numCotas",
      "erroCotas",
      `Para ${numeros} números: ${regra.minCotas} a ${regra.maxCotas} cotas.`
    );
    valido = false;
  }

  if (!valido) return;

  const total = regra.minBolao * apostas;
  const valorCota = total / cotas;

  document.getElementById("resultado").value =
    `Custo total: R$ ${total.toFixed(2)}\n` +
    `Valor por cota: R$ ${valorCota.toFixed(2)}`;
}

// ====================== SORTEIO ======================
function sortearNumero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let contadorJogo = 1;

function sortearNumeros() {
  const ini = parseInt(document.getElementById("numeroInicial").value);
  const fim = parseInt(document.getElementById("numeroFinal").value);
  const total = parseInt(document.getElementById("numeroTotalJogo").value);

  if (isNaN(ini) || isNaN(fim) || isNaN(total) || ini > fim || total < 6 || total > 20)
    return;

  let nums = [];
  while (nums.length < total) {
    const n = sortearNumero(ini, fim);
    if (!nums.includes(n)) nums.push(n);
  }

  nums.sort((a, b) => a - b);

  document.getElementById("resultado1").value +=
    `Jogo ${contadorJogo}: ${nums.join(", ")}\n`;

  contadorJogo++;
}
