import { roomResults } from "./battleResult.js";

export const roomTimers = {};

/* ===============================
   START TIMER
=============================== */
export function startBattleTimer(io, roomID, duration = 300) {
  const startTime = Date.now();

  roomTimers[roomID] = { startTime, duration };

  roomTimers[roomID].interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = duration - elapsed;

    if (remaining <= 0) {
      clearInterval(roomTimers[roomID].interval);
      delete roomTimers[roomID];

      io.to(roomID).emit("timer_end");

      // 🔥 DRAW ONLY IF NO WINNER YET
      const data = roomResults[roomID];
      if (!data || !data.winnerDeclared) {
        io.to(roomID).emit("battle_result", { type: "draw" });
        delete roomResults[roomID];
      }

      return;
    }

    io.to(roomID).emit("timer_tick", { remaining });
  }, 1000);
}

/* ===============================
   STOP TIMER
=============================== */
export function stopBattleTimer(roomID) {
  if (roomTimers[roomID]) {
    clearInterval(roomTimers[roomID].interval);
    delete roomTimers[roomID];
  }
}
