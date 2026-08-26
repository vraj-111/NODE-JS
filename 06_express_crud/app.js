import express from "express";
import HttpError from "./middleware/httpError.js";

const app = express();

const tasks = [
  {
    id: 1,
    task: "Make A Website Of Management System As your Wish",
    description: "Using HTML, CSS, Bootstrap, Javascript etc.",
  },
  {
    id: 2,
    task: "Design A UI of As your Wish",
    description: "Using HTML, CSS",
  },
  {
    id: 3,
    task: "Go To A InternShip",
    description: "To Passed Interview",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from Baccha's server",
  });
});

app.get("/task", (req, res) => {
  if (tasks.length === 0) {
    return res.status(200).json({
      message: "No task data available",
      tasks: [],
    });
  }

  res.status(200).json({
    success: true,
    message: "Task data fetched successfully",
    tasks,
  });
});

app.get("/task/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return next(new HttpError("No task data found ", 404));
  }

  res.status(200).json({
    success: true,
    message: "Task found",
    task,
  });
});

app.post("/addTask", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(new HttpError("Task and description are required", 400));
  }

  const newTask = {
    id:new Date().getTime(),
    task,
    description,
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "New task added successfully",
    newTask,
  });
});

app.put("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskDataIndex = tasks.findIndex((t) => t.id === id);

  if (taskDataIndex === -1) {
    return next(new HttpError("Task data not found", 404));
  }

  const { task, description } = req.body;

  if (!task || !description) {
    return next(new HttpError("Task and description are required", 400));
  }

  tasks[taskDataIndex] = {
    ...tasks[taskDataIndex],
    task,
    description,
  };

  res.status(200).json({
    success: true,
    message: "Task data updated successfully",
    updatedTask: tasks[taskDataIndex],
  });
});

app.delete("/task/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return next(new HttpError("Task not found with this ID", 404));
  }

  const deletedTask = tasks.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Task data deleted successfully",
    deletedTask: deletedTask[0],
  });
});

app.use((req, res, next) => {
  return next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Something went wrong. Please try again later",
  });
});

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`Server is running on port ${port}`);
});
