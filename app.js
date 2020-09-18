// selectors

const todoInput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listener
document.addEventListener('DOMContentLoaded', getTodos);
todobutton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// function

function addTodo(event) {
    // prevent form from submiting
    event.preventDefault();
    // Todo Div
    const TodoDiv = document.createElement('div');
    TodoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    TodoDiv.appendChild(newTodo);

    // save todo to localStorage
    saveLocalTodos(todoInput.value);

    // checkmark btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    TodoDiv.appendChild(completedButton);

    // trash btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    TodoDiv.appendChild(trashButton);

    // append todo-list
    todoList.appendChild(TodoDiv);

    // clear todo input value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    // delete
    if (item.classList[0] === 'trash-btn') {
        // Animation
        todo.classList.add("fall")

        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function() {
            todo.remove();
        })

    }

    // check
    if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle("completed")
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

        }

    });
}

function saveLocalTodos(todo) {
    // check if already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // check if already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        // Todo Div
        const TodoDiv = document.createElement('div');
        TodoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        TodoDiv.appendChild(newTodo);

        // checkmark btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        TodoDiv.appendChild(completedButton);

        // trash btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        TodoDiv.appendChild(trashButton);

        // append todo-list
        todoList.appendChild(TodoDiv);

    });
}

function removeLocalTodos(todo) {
    // check if already exist
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}