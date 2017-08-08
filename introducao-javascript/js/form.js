//Adicionando pacientes novos
var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event){
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");
  var paciente = obtemPacienteDoFormulario(form);
  var pacienteTr = montarTr(paciente);
  var erro = validaPaciente(paciente);

  if (erro.length > 0) {
    exibeMensagensDeErro(erro);
    return;
  }

  var tabela = document.querySelector("#tabela-pacientes");

  tabela.appendChild(pacienteTr);

  form.reset();

  var mensagensErro = document.querySelector("#mensagens-erro");
  mensagensErro.innerHTML = "";
});

//puxando informações do form
function obtemPacienteDoFormulario(form) {
  var paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }

  return paciente;
}

//montando a colunas
function montarTr(paciente){
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(montarTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montarTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montarTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montarTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montarTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

//montando linhas
function montarTd(dado, classe){
  var td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);

  return td;
}

//validação
function validaPaciente(paciente){
  var erros = [];

  if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
  }

  if (paciente.gordura.length == 0) {
    erros.push("A gordura não pode ser em branco");
  }

  if (paciente.peso.length == 0) {
    erros.push("O peso não pode ser em branco");
  }

  if (paciente.altura.length == 0) {
    erros.push("A altura não pode ser em branco");
  }

  if (!validaPeso(paciente.peso)) {
      erros.push("Peso é inválido");
  }
  if (!validaAltura(paciente.altura)) {
    erros.push("Altura é inválida")
  }

  return erros;
}

function exibeMensagensDeErro(erros){
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";

  erros.forEach(function(erro){
    var li = document.createElement("li");

    li.textContent = erro;
    ul.appendChild(li);
  });
}
