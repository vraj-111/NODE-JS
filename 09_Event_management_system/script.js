import express from "express";
import dotenv from "dotenv";
import httError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is Bachha'Event management system");
});

app.use((req, res, next) => {
  return next(new httError("Request route not found", 404));
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(error.statusCode || 500)
    .json({
      message: error.message || "Internal server error",
    });
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("Failed to connect DB");
    }

    app.listen(port, (error) => {
      if (error) {
        console.log(error.message);
      }

      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

startServer();
