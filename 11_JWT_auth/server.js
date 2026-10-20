import express from "express";
import dotenv from "dotenv";
import HttpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || 500).json({
    message: error.message || "internal server error",
  });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    const connection = await connectDB();

    if (!connection) {
      throw new Error("failed to connect db");
    }

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
