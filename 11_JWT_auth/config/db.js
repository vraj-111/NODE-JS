import mongoose from "mongoose";

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jwt_auth";
    const connection = await mongoose.connect(mongoUri);

    console.log("db connected");
    return connection;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDB;