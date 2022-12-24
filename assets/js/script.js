const tarefaButton = document.getElementById('tarefaButton');
const tarefaInput = document.getElementById('tarefaInput');
const listaTarefa = document.getElementById('listaTarefa');
let tarefasTela = null;

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function adicionarTarefa(nomeTarefa) {

   listaTarefa.innerHTML += `<li  class="flexzada">${nomeTarefa}<div><span class="marcar"></span><span class="apagar"></span></div></li>`
    limparInput();
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
  const lis = document.querySelectorAll('li');
  const arr = [...lis];
  let index = 0;

  if (el.classList.contains('apagar')) {
    console.log(arr);
    let resposta = confirm('Deseja realmente apagar a tarefa?');
    if (resposta) {

      index = arr.findIndex(e => e.innerText == el.parentElement.parentElement.innerText );
      tarefas.splice(index,1);
      el.parentElement.parentElement.remove();
      localStorage.setItem('tarefas', JSON.stringify(tarefas)); // esta sobrepondo o array atual toda hora transformado em json
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
  if(tarefas.length > 0) {
  for (let tarefa of tarefas) { // para cada tarefa, do array listadetarefas, 
    adicionarTarefa(tarefa); // crie uma tarefa na tela
  }
}
}
recuperaPrintaTarefa(); // chamando o metodo de resgate e mostrando na tela.

