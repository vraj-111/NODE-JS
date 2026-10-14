import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from Baccha's Travora server");
});

app.use((req, res, next) => {
  return next(new httpError("request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "internal server error",
  });
});

const port = Number(process.env.PORT) || 5000;
const fallbackPort = 5001;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("Failed to connect DB");
    }

    const startListener = (listenPort) => {
      const server = app.listen(listenPort, () => {
        console.log(`server running on port ${listenPort}`);
      });

      server.on("error", (error) => {
        if (error.code === "EADDRINUSE" || error.code === "EACCES") {
          if (listenPort === port && fallbackPort !== port) {
            console.log(`Port ${listenPort} is unavailable. Retrying on port ${fallbackPort}.`);
            startListener(fallbackPort);
            return;
          }
        }

        console.error(error.message);
        process.exit(1);
      });
    };

    startListener(port);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

startServer();