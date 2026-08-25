import express from "express";
import HttpError from "./middleware/httpError.js";

const app = express();

const task = [
  {
    id: 1,
    task: "Make A Website Of Management System As your Wish",
    description: "Using HTML , CSS , Bootstrap , Javascript etc.",
  },
  {
    id: 2,
    task: "Design A UI of As your Wish",
    description: "Using HTML,CSS",
  },
  {
    id: 3,
    task: "Go To A InternShip",
    description: "To Passed Interview",
  },

];

app.get("/task", (req, res, next) => {
  if (task.length === 0) {
    return res.status(200).json({ message: "No task available" });
  }

  res.status(200).json({ message: "Task added successfully", task });
});

app.get("/", (req, res) => {
  return res.json({ message: "Express Crud" });
});

app.use((req, res, next) => {
  return next(new HttpError("Request not Found"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "server error" });
});

const port = 5000;

app.listen(port, (error) => {
  if (error) {
    return console.log(error.message);
  }

  console.log(`server running on port ${port}`);
});
