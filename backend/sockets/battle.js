// sockets/battle.js

export default function battle(io) {
  io.on("connection", (socket) => {

    // Opponent typing
    socket.on("typing", ({ roomID, typing }) => {
      socket.to(roomID).emit("opponent_typing", typing);
    });

    // Testcase progress update
    socket.on("progress_update", ({ roomID, passed }) => {
      socket.to(roomID).emit("opponent_progress", passed);
    });

    // Code submitted
    socket.on("submit_code", ({ roomID }) => {
      socket.to(roomID).emit("opponent_submitted");
    });
  });
}
