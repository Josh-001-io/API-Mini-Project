const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + '?_limit=10')
    .then((res) => res.json())
      .then((data) => {
          data.forEach((todo) => addTodoToDOM(todo));
      });
};

const addTodoToDOM = (todo) => {
    const div = document.createElement("div");
    div.className =
      "todo p-3 text-2xl border border-gray-600 rounded-md font-bold bg-gray-100 cursor-pointer text-center";

    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute("data-id", todo.id);

    if (todo.completed) {
      div.classList.add("done");
    }

    document.getElementById("todo-list").appendChild(div);   
};

const CreateTodos = (e) => {
    e.preventDefault();

    const input = e.target.querySelector('input');
    const newTodo = {
        title: input.value,
        completed: false
    };

    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            addTodoToDOM(data);
            input.value = "";
        });
}

const togglecompleted = (e) => {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');

     updateTodo(e.target.dataset.id, e.target.classList.contains('done'));

    };
}

const updateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
};
 
const deleteTodo = (e) => {
    if (e.target.classList.contains('todo')) {
        const id = e.target.dataset.id;
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => e.target.remove());
    };

};


const init = () => {
    
    document.addEventListener("DOMContentLoaded", getTodos());
    document.querySelector('#todo-form').addEventListener("submit", CreateTodos);
    document
        .querySelector('#todo-list')
        .addEventListener("click", togglecompleted);
    document
        .querySelector('#todo-list')
        .addEventListener('dblclick', deleteTodo);
}

init();

