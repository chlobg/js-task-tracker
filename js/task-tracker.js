// ========== DOM Elements ==========
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskSummary = document.getElementById("taskSummary");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");
const sortOrder = document.getElementById("sortOrder");
const toggleBtn = document.getElementById("toggle-theme");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");

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

function formatDate(dateStr) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
}

function renderTasks() {
  const filtered = getFilteredTasks();
  const sorted = getSortedTasks(filtered);

  taskList.innerHTML = "";

  if (sorted.length === 0) {
    taskList.innerHTML = `
<li class="task-list__empty">
<img src="asssets/icons/tracker__icon--notes.svg" alt="Empty" />
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

    const left = document.createElement("div");
    left.className = "task-list__left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-list__checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const info = document.createElement("div");
    info.className = "task__info";

    const due = document.createElement("span");
    due.textContent = `Due ${formatDate(task.date)}`;
    due.className =
      new Date(task.date) < new Date()
        ? "task__due-date--past"
        : "task__due-date--future";

    const subtitle = document.createElement("div");
    subtitle.className = "task-list__date";
    subtitle.textContent = "Added today";

    const title = document.createElement("div");
    title.className = "task-list__title";
    title.textContent = task.name;

    // Append title, subtitle, and due date to info container
    // left.appendChild(checkbox);
    // left.appendChild(due);
    // left.appendChild(title);
    // left.appendChild(subtitle);
    left.appendChild(checkbox);
    left.appendChild(info);
    info.appendChild(title);
    info.appendChild(due); // avant
    info.appendChild(subtitle);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "task-list__delete";
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
           fill="none" viewBox="0 0 24 24" 
           stroke="currentColor" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 
                 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 
                 011-1h4a1 1 0 011 1v3m-7 0h8"/>
      </svg>
    `;
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    const right = document.createElement("div");
    right.className = "task-list__right";
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);
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

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  moonIcon.classList.add("hidden");
  sunIcon.classList.remove("hidden");
} else {
  document.body.classList.remove("dark-mode");
  moonIcon.classList.remove("hidden");
  sunIcon.classList.add("hidden");
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  moonIcon.classList.toggle("hidden", isDark);
  sunIcon.classList.toggle("hidden", !isDark);
});

// ========== Init ==========
renderTasks();
