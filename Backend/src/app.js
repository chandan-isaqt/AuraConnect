import express from "express";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/soketManager.js";

import { Server } from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./routes/usersroutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const mongoURL =
  "mongodb+srv://chandandas20314:Chandan%409635217560@cluster0.0aanjfu.mongodb.net/";


app.set("port", process.env.PORT || 8000);


app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    const connectDB = await mongoose.connect(mongoURL);
    console.log(
      `✅ MongoDB connected successfully! Host: ${connectDB.connection.host}`
    );
    const PORT = app.get("port");

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

start();
