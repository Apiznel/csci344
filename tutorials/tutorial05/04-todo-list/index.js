function addTodo() {
  let inputElement = document.querySelector("#todoInput");
  let value = inputElement.value;
  let todoElement = document.querySelector("ul");
  todoElement.insertAdjacentHTML("beforeend", "<li>" + value + "</li>");
  inputElement.value = "";
}
