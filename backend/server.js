// main server.js
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
import socketManager from "./sockets/index.js";

// ----------------------
// EXPRESS + HTTP SETUP
// ----------------------
const app = express();
const httpServer = http.createServer(app);

// ----------------------
// MIDDLEWARES (TEMP: OPEN CORS)
// ----------------------
app.use(
  cors({
    origin: true, // ✅ allow all origins safely (for now)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ----------------------
// API ROUTES
// ----------------------
app.use("/api/v1", indexRoute);

// Test Route
app.get("/", (req, res) => {
  res.json({ msg: "Code & Chaos Backend Running ⚔️🔥" });
});

// Health Check (recommended for Render)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
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
    console.log(
      chalk.greenBright.bold(`🚀 Server running on Port: ${PORT}`)
    );
  });
});

mainDB.on("error", (err) => {
  console.log(
    chalk.redBright.bold("❌ Main DB Connection Failed"),
    err
  );
  process.exit(1);
});

// ----------------------
// SOCKET.IO SETUP
// ----------------------
const io = new Server(httpServer, {
  cors: {
    origin: true, // ✅ allow all origins (for now)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach feature-specific sockets
socketManager(io);

// Basic socket lifecycle
io.on("connection", (socket) => {
  console.log(chalk.green(`⚡ Player Connected: ${socket.id}`));

  socket.on("join_room", ({ roomID }) => {
    if (!roomID) return;

    socket.join(roomID);
    socket.emit("joined_room", { roomID });

    console.log(
      chalk.blue(`🔗 Socket ${socket.id} joined room: ${roomID}`)
    );

    const members = io.sockets.adapter.rooms.get(roomID) || new Set();
    console.log(
      chalk.yellow(`👥 Members in ${roomID}:`),
      Array.from(members)
    );
  });

  socket.on("leave_room", ({ roomID }) => {
    if (!roomID) return;
    socket.leave(roomID);
    console.log(
      chalk.magenta(`⤵ Socket ${socket.id} left room: ${roomID}`)
    );
  });

  socket.on("disconnect", () => {
    console.log(chalk.red(`❌ Player Disconnected: ${socket.id}`));
  });
});

// Optional export
export { io };
