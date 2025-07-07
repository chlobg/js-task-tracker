// ========== DOM Elements ==========
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskSummary = document.getElementById("taskSummary");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
const sortOrder = document.getElementById("sortOrder");

// ========== Data ==========
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ========== Event Listeners ==========
addBtn.addEventListener("click", handleAddTask);
searchInput?.addEventListener("input", renderTasks);
filterStatus?.addEventListener("change", renderTasks);
sortOrder?.addEventListener("change", renderTasks);

// ========== Functions ==========

function handleAddTask() {
  const name = taskInput.value.trim();
  const date = dateInput.value;
  if (!name) return;

  const task = {
    id: Date.now(),
    name,
    date,
    done: false,
  };

  tasks.push(task);
  saveTasks();
  clearInputs();
  renderTasks();
}

function clearInputs() {
  taskInput.value = "";
  dateInput.value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const filtered = getFilteredTasks();
  const sorted = getSortedTasks(filtered);

  taskList.innerHTML = "";

  if (sorted.length === 0) {
    taskList.innerHTML = `
      <li class="task-list__empty">
        <img src="asssets/icons/tracker__icon--notes.png" alt="Empty" />
        <p>No tasks yet</p>
        <small>Get started by adding your first task above!</small>
      </li>`;
    updateSummary(0, 0, 0);
    return;
  }

  let completed = 0;

  sorted.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-list__item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = `${task.name} ${task.date ? `(${task.date})` : ""}`;
    if (task.done) {
      span.style.textDecoration = "line-through";
      completed++;
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, span, deleteBtn);
    taskList.appendChild(li);
  });

  updateSummary(sorted.length, completed, sorted.length - completed);
}

function getFilteredTasks() {
  const search = searchInput?.value.toLowerCase() || "";
  const status = filterStatus?.value || "All Tasks";

  return tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(search);
    const matchesStatus =
      status === "All Tasks" ||
      (status === "Completed" && task.done) ||
      (status === "Incomplete" && !task.done);
    return matchesSearch && matchesStatus;
  });
}

function getSortedTasks(taskArray) {
  const order = sortOrder?.value || "Newest First";
  return [...taskArray].sort((a, b) => {
    if (order === "A-Z") return a.name.localeCompare(b.name);
    if (order === "Oldest First") return a.id - b.id;
    return b.id - a.id;
  });
}

function updateSummary(total, completed, remaining) {
  if (taskSummary) {
    taskSummary.textContent = `${total} tasks • ${completed} completed • ${remaining} incomplete`;
  }
}

// ========== Init ==========
renderTasks();
