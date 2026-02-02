import { saveMatchHistory } from "../services/match-history-service.js";
import { roomPlayers } from "./roomPlayers.js";

export const roomResults = {};

/* ===============================
   STORE SUBMISSION
=============================== */
export function recordSubmission(roomID, socketId, score) {
  if (!roomResults[roomID]) {
    roomResults[roomID] = {
      winnerDeclared: false,
    };
  }

  roomResults[roomID][socketId] = {
    score,
    submittedAt: Date.now(),
  };
}

/* ===============================
   FIRST CORRECT WINS
=============================== */
export async function decideWinner(roomID, io, winnerSocketId) {
  if (!io || !winnerSocketId) return;

  const room = io.sockets.adapter.rooms.get(roomID);
  const data = roomResults[roomID];

  if (!room || !data || data.winnerDeclared) return;

  data.winnerDeclared = true;

  console.log("🏆 WINNER SOCKET:", winnerSocketId);

  const sockets = [...room];
  const loserSocketId = sockets.find((id) => id !== winnerSocketId);

  const players = roomPlayers[roomID] || {};

  const winnerEmail = players[winnerSocketId];
  const loserEmail = players[loserSocketId];

  console.log("📧 WINNER EMAIL:", winnerEmail);
  console.log("📧 LOSER EMAIL:", loserEmail);

  // emit result (UNCHANGED)
  for (const socketId of room) {
    io.to(socketId).emit("battle_result", {
      type: socketId === winnerSocketId ? "winner" : "loser",
      score: 100,
    });
  }

  /* 🔥 SAVE MATCH HISTORY */
  try {
    if (winnerEmail && loserEmail) {
      console.log("📦 SAVING MATCH HISTORY (SUBMIT)");

      await saveMatchHistory({
        roomID,
        playerEmail: winnerEmail,
        opponentEmail: loserEmail,
        result: "win",
        score: 100,
        reason: "submission_successful",
      });

      await saveMatchHistory({
        roomID,
        playerEmail: loserEmail,
        opponentEmail: winnerEmail,
        result: "lose",
        score: 100,
        reason: "submission_successful_by_opponent",
      });

      console.log("✅ MATCH HISTORY SAVED (SUBMIT)");
    } else {
      console.warn("⚠️ Emails missing, history NOT saved");
    }
  } catch (err) {
    console.error("❌ Failed to save match history:", err.message);
  }

  delete roomResults[roomID];
  delete roomPlayers[roomID]; // 🧹 cleanup
}

/* ===============================
   QUIT LOGIC
=============================== */
export async function decideWinnerOnQuit(roomID, quitterId, io) {
  const room = io.sockets.adapter.rooms.get(roomID);
  if (!room) return;

  console.log("🚪 PLAYER QUIT:", quitterId);

  const sockets = [...room];
  const winnerSocketId = sockets.find((id) => id !== quitterId);

  const players = roomPlayers[roomID] || {};

  const winnerEmail = players[winnerSocketId];
  const quitterEmail = players[quitterId];

  console.log("📧 WINNER EMAIL:", winnerEmail);
  console.log("📧 QUITTER EMAIL:", quitterEmail);

  for (const socketId of room) {
    if (socketId !== quitterId) {
      io.to(socketId).emit("battle_result", {
        type: "winner",
        reason: "opponent_quit",
      });
    }
  }

  /* 🔥 SAVE MATCH HISTORY */
  try {
    if (winnerEmail && quitterEmail) {
      console.log("📦 SAVING MATCH HISTORY (QUIT)");

      await saveMatchHistory({
        roomID,
        playerEmail: winnerEmail,
        opponentEmail: quitterEmail,
        result: "win",
        reason: "opponent_quit",
      });

      await saveMatchHistory({
        roomID,
        playerEmail: quitterEmail,
        opponentEmail: winnerEmail,
        result: "lose",
        reason: "quit",
      });

      console.log("✅ MATCH HISTORY SAVED (QUIT)");
    } else {
      console.warn("⚠️ Emails missing, history NOT saved");
    }
  } catch (err) {
    console.error("❌ Failed to save match history:", err.message);
  }

  delete roomResults[roomID];
  delete roomPlayers[roomID]; // 🧹 cleanup
}
