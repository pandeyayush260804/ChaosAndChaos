// src/lib/socket.ts
import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:7777";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ["websocket"],
});

export default socket;
