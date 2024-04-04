// Todo.js
document.addEventListener("DOMContentLoaded", function () {
  let addButton = document.getElementById("list__button");
  let input = document.querySelector("input");
  let list = document.getElementById("list__ul");
  let date = document.getElementById("header__date");
  let activeTasks = document.querySelector("#header__active__tasks span");
  let listContainer = document.getElementById("list__container");

  let todos = [];

  listContainer.classList.add("hide");

  // Function addTodo
  const addTodo = () => {
    addButton.addEventListener("click", function () {
      if (input.value !== "") {
        console.log("Input value before adding:", input.value); 
        listContainer.style.display = "block";
        let todoText = input.value;
        console.log("Todo text:", todoText);
        let todo = {
          text: todoText,
          trashButton: false,
          editButton: false,
        };
        console.log("New todo:", todo);
        todos.push(todo);
        console.log("Todos after adding:", todos);
        input.value = "";
        console.log("Input value after clearing:", input.value); 
        displayTodos();
        displayActiveTasks();
      } else {
        alert("Please add a task");
      }
    });
  };

  addTodo();

  // Display Todos
  const displayTodos = () => {
    let html = "";
    todos.forEach((todo, index) => {
      listContainer.classList.remove("hide");
      html += `
        <li class="list__li">
          <div class="list__li__text">
            <p>${todo.text}</p>
          </div>
          <div class="list__li__buttons">
            <div class="list__li__trashbutton">
              <img class="list__li__trash" src="/public/trash-bin.png">
            </div>
            <div class="list__li__editbutton">
              <img class="list__li__edit" src="/public/editing.png">
            </div>
          </div>
        </li>
      `;
    });
    list.innerHTML = html;
    let trashButtons = document.querySelectorAll(".list__li__trash");
    let editButtons = document.querySelectorAll(".list__li__edit");
  
    trashButtons.forEach((button, index) => {
      button.addEventListener("click", () => deleteTodo(index));
    });
    editButtons.forEach((button, index) => {
      button.addEventListener("click", () => editTodo(index));
    });
    if (todos.length === 0) {
        listContainer.style.display = "none";
      }
  };
  displayTodos();

  // Function deleteTodo by pressing trash button
  const deleteTodo = (index) => {
    todos.splice(index, 1);
    if (todos.length === 0) {
        listContainer.style.display = "none";
    }
    displayTodos();
    displayActiveTasks();
  };

  // Function editTodo
  const editTodo = (index) => {
    let newText = prompt("Edit task:", todos[index].text);
    if (newText !== null) {
      todos[index].text = newText;
      displayTodos();
    }
  }

  // Function to display active tasks
  const displayActiveTasks = () => {
    let activeCount = 0;
    todos.forEach((todo) => {
      if (!todo.trashButton) {
        activeCount++;
      }
    });
    activeTasks.innerHTML = activeCount;
  };
});

// Show/hide the scroll to top button based on scroll position
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.scrollY > 300) { 
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top function
  document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Update date in header
const updateDate = () => {
    const currentDateElement = document.getElementById("header__date");
    const date = new Date();
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-NZ', options).format(date);
    currentDateElement.textContent = formattedDate;
  }
   updateDate(); 
  
