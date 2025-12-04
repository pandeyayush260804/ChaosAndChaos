// sockets/matchmaking.js
import { v4 as uuidv4 } from "uuid";

let queue = []; // Waiting players

export default function matchmaking(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Player Connected:", socket.id);

    socket.on("join_queue", (playerData) => {
      const email = playerData.email;
      console.log("➡ join_queue request:", email);

      // ❗ Prevent SAME PLAYER joining multiple times
      const alreadyQueued = queue.some((p) => p.playerData.email === email);
      if (alreadyQueued) {
        console.log("⚠ Player already in queue:", email);
        return;
      }

      // Add to queue
      queue.push({ socket, playerData });
      console.log("📌 Queue size:", queue.length);

      // Only match if 2 UNIQUE players exist
      if (queue.length >= 2) {
        const p1 = queue.shift();
        const p2 = queue.shift();

        // ❗ EXTRA SAFETY: prevent same email
        if (p1.playerData.email === p2.playerData.email) {
          console.log("❌ Same player detected, re-queueing p1...");
          queue.push(p1); // put first back in queue
          return;
        }

        // Create room
        const roomID = `room_${uuidv4()}`;
        console.log("🎯 Match Found → Room:", roomID);

        // Move both players to room
        p1.socket.join(roomID);
        p2.socket.join(roomID);

        // Notify both matched players
        io.to(roomID).emit("match_found", {
          roomID,
          players: [p1.playerData, p2.playerData],
        });
      }
    });

    // Remove from queue when disconnected
    socket.on("disconnect", () => {
      queue = queue.filter((p) => p.socket.id !== socket.id);
      console.log("🔴 Player Disconnected:", socket.id);
    });
  });
}
