window.addEventListener('load', () => {
    const newTodoForm = document.querySelector('#new-todo-form');
    let todos = [];

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        displayTodos();
    });

    function displayTodos() {
        const todoList = document.querySelector('#todo-list');

        todoList.innerHTML = '';

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            if (todo.done) {
                todoItem.classList.add('done');
            }

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            span.classList.add('bubble');
            if (todo.category === 'personal') {
                span.classList.add('personal');
            } else {
                span.classList.add('business');
                if (todo.done) {
                    span.classList.add('done');
                }
            }
            
            input.type = 'checkbox';
            input.checked = todo.done;

            const content = document.createElement('div');
            content.classList.add('todo-content');
            const contentInput = document.createElement('input');
            contentInput.type = 'text';
            contentInput.value = todo.content;
            contentInput.readOnly = true;
            content.appendChild(contentInput);

            const actions = document.createElement('div');
            actions.classList.add('actions');
            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.textContent = 'Editar';
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Deletar';
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            label.appendChild(input);
            label.appendChild(span);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            input.addEventListener('click', () => {
                todo.done = input.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });

            editButton.addEventListener('click', () => {
                contentInput.removeAttribute('readonly');
                contentInput.focus();
            });

            contentInput.addEventListener('blur', () => {
                contentInput.readOnly = true;
                todo.content = contentInput.value;
                localStorage.setItem('todos', JSON.stringify(todos));
            });

            deleteButton.addEventListener('click', () => {
                todos = todos.filter(t => t !== todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });
        });
    }

    displayTodos();
});
