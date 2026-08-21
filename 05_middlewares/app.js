import express from "express";
import helmet from "helmet";
import checkRole from "./middleware/checkrole.js";

const app = express();

const port = 215;

// 1. Application-level middleware

app.use(express.json());

app.use(helmet());

// 2. Routes

// Home Page
app.get("/", (req, res) => {
  res.send("Welcome to the Baccha's server");
});

// About Page
app.get("/about", (req, res) => {
  res.send("This is the Baccha's about page");
});


// 3.undefined routes

app.use((req, res) => {
  res.status(404).send("This serever Not Exist");
});

// 4. error-handling 

app.use((error, req, res, next) => {
  console.error("Error: ", error);

  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "error Was comming",
  });
});

// When The Error , So We using solve to If Through.
app.listen(port, (err) => {
  if (err) {
    console.error("Error", err.message);
    return;
  }

  console.log(`Server running on port${port}`);
});
