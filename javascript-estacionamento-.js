// Controle de Estacionamento
// Organização simples inspirada em MVC:
// Model: funções de dados | View: mostrar na tela | Controller: ações do usuário

// ===== MODEL: guardar e consultar os dados =====

function listar() {
  return JSON.parse(localStorage.getItem("reservas")) || [];
}

function salvar(reserva) {
  let reservas = listar();
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

function remover(numeroVaga) {
  let reservas = listar();
  let atualizadas = reservas.filter(function (reserva) {
    return reserva.vaga !== numeroVaga;
  });
  localStorage.setItem("reservas", JSON.stringify(atualizadas));
}

// ===== VIEW: mostrar as duas telas e a tabela =====

function mostrarTela(tela) {
  document.getElementById("tela-vagas").classList.add("escondido");
  document.getElementById("tela-cadastro").classList.add("escondido");
  document.getElementById("tela-" + tela).classList.remove("escondido");
  if (tela === "vagas") mostrarVagas();
}

function mostrarVagas() {
  let reservas = listar();
  let tabela = document.getElementById("lista-reservas");
  tabela.innerHTML = "";

  let disponiveis = [];
  for (let numero = 1; numero <= 10; numero++) {
    let ocupada = reservas.some(function (reserva) {
      return reserva.vaga === numero;
    });
    if (!ocupada) disponiveis.push(numero);
  }

  document.getElementById("vagas-disponiveis").textContent =
    disponiveis.length > 0 ? disponiveis.join(", ") : "Nenhuma vaga disponível.";

  document.getElementById("mensagem-lista").textContent =
    reservas.length === 0 ? "Nenhuma reserva cadastrada." : "";

  reservas.forEach(function (reserva) {
    let linha = document.createElement("tr");
    let dados = [reserva.vaga, reserva.placa, reserva.proprietario,
      reserva.apartamento, reserva.bloco, reserva.modelo, reserva.cor];

    dados.forEach(function (dado) {
      let celula = document.createElement("td");
      celula.textContent = dado;
      linha.appendChild(celula);
    });

    let celulaAcao = document.createElement("td");
    let botao = document.createElement("button");
    botao.textContent = "Remover";
    botao.className = "botao-remover";
    botao.addEventListener("click", function () {
      removerReserva(reserva.vaga);
    });
    celulaAcao.appendChild(botao);
    linha.appendChild(celulaAcao);
    tabela.appendChild(linha);
  });
}

// ===== CONTROLLER: ações do usuário =====

function removerReserva(numeroVaga) {
  if (confirm("Deseja remover a reserva da vaga " + numeroVaga + "?")) {
    remover(numeroVaga);
    mostrarVagas();
  }
}

document.getElementById("formulario").addEventListener("submit", function (evento) {
  evento.preventDefault();

  let reserva = {
    placa: document.getElementById("placa").value.trim().toUpperCase(),
    proprietario: document.getElementById("proprietario").value.trim(),
    apartamento: document.getElementById("apartamento").value.trim(),
    bloco: document.getElementById("bloco").value.trim(),
    modelo: document.getElementById("modelo").value.trim(),
    cor: document.getElementById("cor").value.trim(),
    vaga: Number(document.getElementById("vaga").value)
  };

  if (reserva.vaga < 1 || reserva.vaga > 10 || !Number.isInteger(reserva.vaga)) {
    alert("Escolha uma vaga de 1 a 10.");
    return;
  }

  let ocupada = listar().some(function (item) {
    return item.vaga === reserva.vaga;
  });

  if (ocupada) {
    alert("Essa vaga já está ocupada. Escolha outra.");
    return;
  }

  salvar(reserva);
  console.log("Reserva cadastrada:", reserva);
  alert("Cadastro realizado com sucesso!");
  document.getElementById("formulario").reset();
  mostrarTela("vagas");
});

// Exibe a lista ao abrir o sistema.
mostrarVagas();
