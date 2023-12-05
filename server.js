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

// const handleEdit = (e) => {
//     let date = new Date();

//     let editedTodo = {
//         id: e.target.parentNode.id,
//         title: "we don't know yet",
//         isDone: false,
//         date: date
//     }

//     console.log(e.target.parentNode);


//     let editInput = document.createElement('input');
    
//     e.target.parentNode.appendChild(editInput);
// }

const handleEdit = (e) => {
    const listItem = e.target.parentNode;
    const todoId = listItem.id;

    let todos = [];

    if (localStorage.getItem("localstorageTodos") !== null) {
        todos = JSON.parse(localStorage.getItem("localstorageTodos"));
    }

    const existingTodoIndex = todos.findIndex(todo => todo.id === Number(todoId));


    if (existingTodoIndex !== -1) {
        const existingTodo = todos[existingTodoIndex];

        const editInput = document.createElement('input');
        editInput.value = existingTodo.title;

        const saveButton = document.createElement('button');
        saveButton.innerHTML = 'Save';
        saveButton.addEventListener('click', () => {
            const updatedTitle = editInput.value;
            existingTodo.title = updatedTitle;
            listItem.removeChild(editInput);
            listItem.removeChild(saveButton);
            listItem.childNodes[0].nodeValue = updatedTitle;
            todos[existingTodoIndex] = existingTodo;
            localStorage.setItem("localstorageTodos", JSON.stringify(todos));
        });

        listItem.appendChild(editInput);
        listItem.appendChild(saveButton);
    }
};



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
