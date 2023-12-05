const form = document.querySelector('form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('ul');

const handleDelete = (e) => {
    console.log(e.target.parentNode.id)

    // find it inside our localstorageTodos
    let todos = JSON.parse(localStorage.getItem("localstorageTodos"))
    todos = todos.filter(element => element.id !== Number(e.target.parentNode.id))
    // add the new array to our localstorage
    localStorage.setItem("localstorageTodos", JSON.stringify(todos))

    // remove the li from the ul 
    e.target.parentNode.remove()
}

const handleEdit = (e) => {
    console.log(e);

    let newTodo = {
        id: Math.floor(Math.random() * 1000 * new Date().getMilliseconds()),
        title: input.value,
        isDone: false,
        date: date
    }
}


const renderTodo = (todo) => {
    let li = document.createElement('li');
    li.id = todo.id;
    li.innerHTML = `${todo.title}`;

    let delButton = document.createElement('button');
    delButton.className = 'delete';
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', handleDelete)

    let editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.className = 'edit';
    editButton.addEventListener('click', handleEdit)

    li.appendChild(delButton);
    li.appendChild(editButton);
    list.appendChild(li)
}

if(localStorage.getItem("localstorageTodos") !== null) {
    let todos = JSON.parse(localStorage.getItem("localstorageTodos"))
    todos.forEach(todo => {
        renderTodo(todo)
    })
}

const handleSubmit = (e) => {
    e.preventDefault();

    let todos = [];

    console.log("todos before we check localstorage", todos)

    if(localStorage.getItem("localstorageTodos") !== null) {
        todos = JSON.parse(localStorage.getItem("localstorageTodos"))
    }
    
    console.log("todos after we check localstorage", todos)

    let date = new Date();
    
    let newTodo = {
        id: Math.floor(Math.random() * 1000 * new Date().getMilliseconds()),
        title: input.value,
        isDone: false,
        date: date
    }
    
    todos.push(newTodo)
    renderTodo(newTodo)
    
    console.log("todos after we add the new newTodo", todos)

    localStorage.setItem("localstorageTodos", JSON.stringify(todos))

    input.value = '';
}

form.addEventListener('submit', handleSubmit)
