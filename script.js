const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + "?_limit=5")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => {
          const div = document.createElement("div");
          
          div.className = "p-3 text-2xl border border-gray-600 rounded-md font-bold bg-gray-100 cursor-pointer text-center";
          
        div.appendChild(document.createTextNode(todo.title));

          document.getElementById("todo-list").appendChild
          (div);
          
          
          if (todo.completed) { 
              div.classList.add('done');
          };
      });
    });
};

getTodos();
