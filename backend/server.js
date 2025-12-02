// MUST BE FIRST
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import chalk from "chalk";
import { Server } from "socket.io";

import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/error404.js";
import { createMainConnection } from "./utils/db/connection.js";
import socketManager from "./sockets/index.js";   // ⭐ ADD SOCKET MODULES

// ----------------------
// EXPRESS + HTTP SETUP
// ----------------------
const app = express();
const httpServer = http.createServer(app);

// ----------------------
// MIDDLEWARES
// ----------------------
app.use(cors());
app.use(express.json());

// ----------------------
// API ROUTES
// ----------------------
app.use("/api/v1", indexRoute);

// Test Route
app.get("/", (req, res) => {
  res.json({ msg: "Code & Chaos Backend Running ⚔️🔥" });
});

// 404 Handler
app.use(Error404);

// ----------------------
// DATABASE CONNECTION
// ----------------------
const mainDB = createMainConnection();

mainDB.on("connected", () => {
  console.log(chalk.greenBright.bold("Main Database Connected ✔"));

  const PORT = process.env.PORT || 7777;

  httpServer.listen(PORT, () => {
    console.log(chalk.greenBright.bold(`🚀 Server running on Port: ${PORT}`));
  });
});

mainDB.on("error", (err) => {
  console.log(chalk.redBright.bold("❌ Main DB Connection Failed"), err);
});

// ----------------------
// SOCKET.IO SETUP
// ----------------------
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// 🔥 Use global socket manager (matchmaking, battle, judge…)
socketManager(io);

// Basic connection logs (kept as requested)
io.on("connection", (socket) => {
  console.log(chalk.green(`⚡ Player Connected: ${socket.id}`));

  socket.on("disconnect", () => {
    console.log(chalk.red(`❌ Player Disconnected: ${socket.id}`));
  });
});
