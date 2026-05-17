const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */

let users = [];

let tasks = [];

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {
  res.send("TaskFlow API Running");
});

/* ---------------- REGISTER ---------------- */

app.post("/register", (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {

    return res.status(400).json({
      message: "Please Fill All Fields"
    });

  }

  const existingUser = users.find(
    user => user.username === username
  );

  if (existingUser) {

    return res.status(400).json({
      message: "User Already Exists"
    });

  }

  users.push({
    username,
    password
  });

  console.log(users);

  res.json({
    message: "User Registered Successfully"
  });

});

/* ---------------- LOGIN ---------------- */

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const user = users.find(
    u =>
      u.username === username &&
      u.password === password
  );

  if (user) {

    res.json({
      message: "Login Successful"
    });

  } else {

    res.status(401).json({
      message: "Invalid Credentials"
    });

  }

});

/* ---------------- CREATE TASK ---------------- */

app.post("/tasks", (req, res) => {

  const task = {

    id: Date.now(),

    title: req.body.title,

    description: req.body.description,

    priority: req.body.priority,

    status: "pending"

  };

  tasks.push(task);

  res.json({
    message: "Task Created Successfully"
  });

});

/* ---------------- GET TASKS ---------------- */

app.get("/tasks", (req, res) => {

  res.json(tasks);

});

/* ---------------- COMPLETE TASK ---------------- */

app.put("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const task = tasks.find(
    t => t.id === id
  );

  if (!task) {

    return res.status(404).json({
      message: "Task Not Found"
    });

  }

  task.status = req.body.status;

  res.json({
    message: "Task Updated Successfully"
  });

});

/* ---------------- DELETE TASK ---------------- */

app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  tasks = tasks.filter(
    t => t.id !== id
  );

  res.json({
    message: "Task Deleted Successfully"
  });

});

/* ---------------- SERVER ---------------- */

app.listen(5000, () => {

  console.log("Server Running On Port 5000");

});
