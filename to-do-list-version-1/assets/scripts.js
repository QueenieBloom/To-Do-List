const form = document.getElementById('task-form');
const taskList = document.getElementById('tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

form.onsubmit = function (e) {
    e.preventDefault();
    const inputField = document.getElementById('task-input');
    addTask(inputField.value);
    form.reset();
};

function addTask(description) {

    //4ª alteração - não adiciona novas tarefas se já houver 15 na lista
    if (taskList.children.length >= 15) {
        return; 
    }
    
    const taskContainer = document.createElement('div');
    const newTask = document.createElement('input');
    const taskLabel = document.createElement('label');
    const taskDescriptionNode = document.createTextNode(description);

    newTask.setAttribute('type', 'checkbox');
    newTask.setAttribute('name', description);
    newTask.setAttribute('id', description);

    taskLabel.setAttribute('for', description);
    taskLabel.appendChild(taskDescriptionNode);

    taskContainer.classList.add('task-item');
    taskContainer.appendChild(newTask);
    taskContainer.appendChild(taskLabel);

    taskList.appendChild(taskContainer);

    // 1ª alteração - botão de remover
    const removeBtn = document.createElement('button');

    removeBtn.innerHTML = 'Excluir';
    taskContainer.appendChild(removeBtn);

    removeBtn.addEventListener('click', function () {
        taskContainer.remove();

        // 3ª alteração - remove a tarefa do localStorage 
        tasks = tasks.filter(task => task !== description);
        //chama a função saveTasks para salvar a nova matriz tasks no LocalStorage 
        //e adiciona a tarefa recém-criada à lista de tarefas
        saveTasks();
    });

    tasks.push(description);
    saveTasks();

    //emissão de um alerta caso ultrapassado o limite maximo de tarefas.
    if (tasks.length >= 15) {
        alert('Quantidade de tarefas ultrapassadas, somente 15 tarefas são permitidas, por favor exclua uma tarefa para adicionar outra !');
    }   
}
// 2ª alteração -  tarefas no localStorage
//Carrega as tarefas salvas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

tasks.forEach(task => {
    addTask(task);
});


/*
function addTask(description) {
    const taskContainer = document.createElement('div');
    const newTask = document.createElement('input');
    const taskLabel = document.createElement('label');
    const taskDescriptionNode = document.createTextNode(description);
    const deleteBtn = document.createElement('button');
  
    newTask.setAttribute('type', 'checkbox');
    newTask.setAttribute('name', description);
    newTask.setAttribute('id', description);
  
    taskLabel.setAttribute('for', description);
    taskLabel.appendChild(taskDescriptionNode);
  
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-task-btn');
  
    taskContainer.classList.add('task-item');
    taskContainer.appendChild(newTask);
    taskContainer.appendChild(taskLabel);
    taskContainer.appendChild(deleteBtn);
  
    taskList.appendChild(taskContainer);
  }
  */