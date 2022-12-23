const tarefaButton = document.getElementById('tarefaButton');
const tarefaInput = document.getElementById('tarefaInput');
const listaTarefa = document.getElementById('listaTarefa');
let tarefasTela = null;

let tarefas = [];

function criarLi() {
  let novoLi = document.createElement('li');
  listaTarefa.appendChild(novoLi);
  return novoLi;
}

function adicionarTarefa(nomeTarefa) {
  if (nomeTarefa === '') {
    alert('A tarefa está vazia, digite qual tarefa deseja salvar');
    return;
  } else {
    let li = criarLi();
    li.innerHTML = nomeTarefa;
  
    criaBotaoApagar(li);
    criaBotaoConcluir(li);
    limparInput();
  }
}

// Metodo para inserir a tarefa no array local, e em sseguida enviar pro local storage
function inserirNoBanco(nomeTarefa) {
   tarefas.push(nomeTarefa); // povoando o array com o nome da tarefa.
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // esta sobrepondo o array atual toda hora transformado em json
}

// ADICIONANDO EVENTO DE ESCUTA NO CLICK PARA ADICIONAR TAREFA
tarefaButton.addEventListener('click', () => {
  inserirNoBanco(tarefaInput.value);
  adicionarTarefa(tarefaInput.value);
});


function criaBotaoApagar(li) {
  const botaoApagar = document.createElement('span');
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  li.appendChild(botaoApagar);
}
function criaBotaoConcluir(li) {
  const botaoConcluir = document.createElement('span');
  // botaoApagar.classList.add('apagar');
  botaoConcluir.setAttribute('class', 'marcar');
  li.appendChild(botaoConcluir);
}


document.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    let resposta = confirm('Deseja realmente apagar a tarefa?');
    if (resposta) {
      el.parentElement.remove();

    }
  } else if (el.classList.contains('marcar')) {
    let resposta = confirm('Você deseja realmente marcar a tarefa como concluida?')
    if (resposta) {
      el.parentElement.classList.add('concluir');
    }
  }
});

function limparInput() {
  tarefaInput.value = '';
  tarefaInput.focus();
}

function recuperaPrintaTarefa() { // printando na tela
  const tarefas = localStorage.getItem('tarefas'); // pegando no local storage, as tarefas armazenadas lá
  const listaDeTarefas = JSON.parse(tarefas); // convertendo essas tarefas para objeto novamente para reutilizar

  for (let tarefa of listaDeTarefas) { // para cada tarefa, do array listadetarefas, 
    adicionarTarefa(tarefa); // crie uma tarefa na tela
  }
  // for (let tarefa in listaDeTarefas) {
  //   adicionarTarefa(listaDeTarefas[tarefa]);
  // }
}
recuperaPrintaTarefa(); // chamando o metodo de resgate e mostrando na tela.

