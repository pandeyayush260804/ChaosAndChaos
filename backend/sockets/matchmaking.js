// sockets/matchmaking.js
import { v4 as uuidv4 } from "uuid";

let queue = []; // Waiting players

export default function matchmaking(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Player Connected:", socket.id);

    // When player clicks "Find Match"
    socket.on("join_queue", (playerData) => {
      console.log("➡ Player joined queue:", playerData);

      queue.push({ socket, playerData });

      // If 2 players available → pair them
      if (queue.length >= 2) {
        const p1 = queue.shift();
        const p2 = queue.shift();

        const roomID = `room_${uuidv4()}`;
        console.log("🎯 Match Found → Room:", roomID);

        // Move both players to this room
        p1.socket.join(roomID);
        p2.socket.join(roomID);

        // Notify both players
        io.to(roomID).emit("match_found", {
          roomID,
          players: [p1.playerData, p2.playerData]
        });
      }
    });

    // If someone disconnects → remove from queue
    socket.on("disconnect", () => {
      queue = queue.filter((p) => p.socket.id !== socket.id);
      console.log("🔴 Player Disconnected:", socket.id);
    });
  });
}
