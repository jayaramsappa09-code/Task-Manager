const username = document.getElementById("username");
const password = document.getElementById("password");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const title = document.getElementById("title");
const description = document.getElementById("description");
const priority = document.getElementById("priority");

const taskBtn = document.getElementById("taskBtn");

const taskList = document.getElementById("taskList");

const dashboard = document.getElementById("dashboard");

/* ---------------- DASHBOARD ---------------- */

function showDashboard() {
  dashboard.style.display = "block";
}

function hideDashboard() {
  dashboard.style.display = "none";
}

/* ---------------- REGISTER ---------------- */

registerBtn.addEventListener("click", async () => {

  const res = await fetch("http://localhost:5000/register", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      username: username.value,
      password: password.value
    })

  });

  const data = await res.json();

  alert(data.message);

});

/* ---------------- LOGIN ---------------- */

loginBtn.addEventListener("click", async () => {

  const res = await fetch("http://localhost:5000/login", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      username: username.value,
      password: password.value
    })

  });

  const data = await res.json();

  if (res.ok) {

    localStorage.setItem("loggedIn", "true");

    showDashboard();

  }

  alert(data.message);

});

/* ---------------- LOGOUT ---------------- */

logoutBtn.addEventListener("click", () => {

  localStorage.removeItem("loggedIn");

  hideDashboard();

});

/* ---------------- CREATE TASK ---------------- */

taskBtn.addEventListener("click", async () => {

  const res = await fetch("http://localhost:5000/tasks", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title: title.value,
      description: description.value,
      priority: priority.value
    })

  });

  const data = await res.json();

  alert(data.message);

  title.value = "";
  description.value = "";

  loadTasks();

});

/* ---------------- LOAD TASKS ---------------- */

async function loadTasks() {

  const res = await fetch("http://localhost:5000/tasks");

  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {

    const div = document.createElement("div");

    div.classList.add("task-item");

    div.innerHTML = `

      <div class="task-top">

        <h3>${task.title}</h3>

        <span class="${task.status}">
          ${task.status}
        </span>

      </div>

      <p>${task.description}</p>

      <div class="priority ${task.priority.toLowerCase()}">
        ${task.priority} Priority
      </div>

      <div class="task-buttons">

        <button onclick="completeTask(${task.id})">
          Complete
        </button>

        <button onclick="deleteTask(${task.id})">
          Delete
        </button>

      </div>

    `;

    taskList.appendChild(div);

  });

}

/* ---------------- DELETE TASK ---------------- */

async function deleteTask(id) {

  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE"
  });

  loadTasks();

}

/* ---------------- COMPLETE TASK ---------------- */

async function completeTask(id) {

  await fetch(`http://localhost:5000/tasks/${id}`, {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      status: "completed"
    })

  });

  loadTasks();

}

/* ---------------- AUTO LOGIN ---------------- */

if (localStorage.getItem("loggedIn")) {

  showDashboard();

}

/* ---------------- INITIAL LOAD ---------------- */

loadTasks();
