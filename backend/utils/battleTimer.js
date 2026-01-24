import { decideWinner } from "./battleResult.js";

export const roomTimers = {};

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

      // auto‑decide winner on timer end
      const winner = decideWinner(roomID);

      if (!winner) {
        io.to(roomID).emit("battle_result", { type: "draw" });
      } else {
        io.to(roomID).emit("battle_result", winner);
      }

      return;
    }

    io.to(roomID).emit("timer_tick", { remaining });
  }, 1000);
}

export function stopBattleTimer(roomID) {
  if (roomTimers[roomID]) {
    clearInterval(roomTimers[roomID].interval);
    delete roomTimers[roomID];
  }
}
