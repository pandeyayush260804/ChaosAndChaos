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
import socketManager from "./sockets/index.js"; // ⭐ global socket modules (matchmaking, battle, questions, judge)

// ----------------------
// EXPRESS + HTTP SETUP
// ----------------------
const app = express();
const httpServer = http.createServer(app);

// ----------------------
// MIDDLEWARES
// ----------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-app.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

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
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});


// 🔥 Attach feature-specific sockets (matchmaking, questions, battle, judge...)
socketManager(io);

// Basic connection logs + room join/leave
io.on("connection", (socket) => {
  console.log(chalk.green(`⚡ Player Connected: ${socket.id}`));

  // ✅ Join a battle room for question / code / timer sync
  socket.on("join_room", ({ roomID }) => {
    if (!roomID) return;

    socket.join(roomID);
    socket.emit("joined_room", { roomID }); // ack back to this client

    console.log(chalk.blue(`🔗 Socket ${socket.id} joined room: ${roomID}`));

    // Optional debug: list room members
    const members = io.sockets.adapter.rooms.get(roomID) || new Set();
    console.log(
      chalk.yellow(`👥 Members in ${roomID}:`),
      Array.from(members)
    );
  });

  // ✅ Leave room on demand (optional, but neat)
  socket.on("leave_room", ({ roomID }) => {
    if (!roomID) return;
    socket.leave(roomID);
    console.log(chalk.magenta(`⤵ Socket ${socket.id} left room: ${roomID}`));
  });

  socket.on("disconnect", () => {
    console.log(chalk.red(`❌ Player Disconnected: ${socket.id}`));
  });
});

export { io }; // optional, only if you use io elsewhere
