export const roomResults = {};

// store latest submission per player
export function recordSubmission(roomID, socketId, score) {
  if (!roomResults[roomID]) {
    roomResults[roomID] = { submissions: {} };
  }

  roomResults[roomID].submissions[socketId] = {
    score,
    submittedAt: Date.now(),
  };
}

// decide winner ONLY when 2 players submitted
export function decideWinner(roomID, io) {
  const data = roomResults[roomID];
  if (!data) return null;

  const entries = Object.entries(data.submissions);
  if (entries.length < 2) return null;

  entries.sort((a, b) => {
    if (b[1].score !== a[1].score) {
      return b[1].score - a[1].score;
    }
    return a[1].submittedAt - b[1].submittedAt;
  });

  if (
    entries[0][1].score === entries[1][1].score &&
    entries[0][1].submittedAt === entries[1][1].submittedAt
  ) {
    io.to(roomID).emit("battle_result", { type: "draw" });
    return;
  }

  io.to(entries[0][0]).emit("battle_result", {
    type: "winner",
    you: true,
    score: entries[0][1].score,
  });

  io.to(entries[1][0]).emit("battle_result", {
    type: "loser",
    you: false,
    score: entries[0][1].score,
  });
}

// winner when someone quits
export function decideWinnerOnQuit(roomID, quitterSocketId, io) {
  const room = io.sockets.adapter.rooms.get(roomID);
  if (!room) return;

  for (const socketId of room) {
    if (socketId !== quitterSocketId) {
      io.to(socketId).emit("battle_result", {
        type: "winner",
        you: true,
        reason: "opponent_quit",
      });
    }
  }
}
