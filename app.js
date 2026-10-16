import { format } from "date-fns";

const STORAGE_KEY = "tiny-todo";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const input = document.getElementById("new-todo-input");
const addButton = document.getElementById("add-button");
const list = document.getElementById("todo-list");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo() {
  const title = input.value.trim();
  if (!title) return;
  todos.push({ id: Date.now(), title, done: false, createdAt: Date.now() });
  input.value = "";
  save();
  render();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  todo.done = !todo.done;
  save();
  render();
}

function deleteTodo(id) {
  if (!confirm("Delete this to-do?")) return;
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

function render() {
  list.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    li.className = todo.done ? "todo done" : "todo";
    li.innerHTML = `
      <input type="checkbox" ${todo.done ? "checked" : ""} />
      <span class="title"></span>
      <span class="meta">Added ${format(todo.createdAt, "MMM d")}</span>
      <button class="delete" title="Delete">×</button>
    `;
    li.querySelector(".title").textContent = todo.title;
    li.querySelector("input").addEventListener("change", () => toggleTodo(todo.id));
    li.querySelector(".delete").addEventListener("click", () => deleteTodo(todo.id));
    list.appendChild(li);
  }
}

addButton.addEventListener("click", addTodo);

render();
