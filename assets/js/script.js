const tarefaButton = document.getElementById('tarefaButton');
const tarefaInput = document.getElementById('tarefaInput');
const listaTarefa = document.getElementById('listaTarefa');
let tarefasTela = null;

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function adicionarTarefa(nomeTarefa) {

   listaTarefa.innerHTML += `<li  class="flexzada">${nomeTarefa}<div><span class="marcar"></span><span class="apagar"></span></div></li>`
    limparInput();
}

function deletarTarefa(index) {
   // .splice(index, qtd(op));
   tarefas.splice(index);
   inserirNoBanco();
}

// Metodo para inserir a tarefa no array local, e em seguida enviar pro local storage
function inserirNoBanco(nomeTarefa) {
   tarefas.push(nomeTarefa); // povoando o array com o nome da tarefa.
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // esta sobrepondo o array atual toda hora transformado em json
}

// ADICIONANDO EVENTO DE ESCUTA NO CLICK PARA ADICIONAR TAREFA
tarefaButton.addEventListener('click', () => {
  if (tarefaInput.value === '') {
    alert('A tarefa está vazia, digite qual tarefa deseja salvar');
    return;
  }
  inserirNoBanco(tarefaInput.value);
  adicionarTarefa(tarefaInput.value);
});

document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    let resposta = confirm('Deseja realmente apagar a tarefa?');
    if (resposta) {
      el.parentElement.parentElement.remove();

    }
  } else if (el.classList.contains('marcar')) {
    let resposta = confirm('Você deseja realmente marcar a tarefa como concluida?')
    if (resposta) {
      el.parentElement.parentElement.classList.add('concluir');
    }
  }
});

function limparInput() {
  tarefaInput.value = '';
  tarefaInput.focus();
}

function recuperaPrintaTarefa() { // printando na tela
 // const listaDeTarefas = JSON.parse(tarefas); // convertendo essas tarefas para objeto novamente para reutilizar
  if(tarefas.length > 0) {
  for (let tarefa of tarefas) { // para cada tarefa, do array listadetarefas, 
    adicionarTarefa(tarefa); // crie uma tarefa na tela
  }
  // for (let tarefa in listaDeTarefas) {
  //   adicionarTarefa(listaDeTarefas[tarefa]);
  // }
}

}

recuperaPrintaTarefa(); // chamando o metodo de resgate e mostrando na tela.

