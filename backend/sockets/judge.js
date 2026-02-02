import { runWithPiston } from "../utils/pistonRunner.js";
import { roomQuestions } from "./questions.js";
import { roomTimers, stopBattleTimer } from "../utils/battleTimer.js";
import {
  recordSubmission,
  decideWinner,
  decideWinnerOnQuit,
} from "../utils/battleResult.js";

export default function judge(io) {
  io.on("connection", (socket) => {

    // ▶ RUN CODE
    socket.on("run_code", async ({ roomID, language, source_code, stdin }) => {
      if (!roomTimers[roomID]) return;

      const result = await runWithPiston({
        language,
        source_code,
        stdin,
      });

      io.to(roomID).emit("code_result", { roomID, ...result });
    });

    // ▶ SUBMIT CODE
    socket.on("submit_code", async ({ roomID, language, source_code }) => {
      if (!roomTimers[roomID]) return;

      const question = roomQuestions[roomID];
      if (!question) return;

      let passed = false;

      for (const tc of question.testcases) {
        const res = await runWithPiston({
          language,
          source_code,
          stdin: tc.stdin,
        });

        if (res.stdout.trim() === tc.expected_output.trim()) {
          passed = true;
          break; // 🔥 FIRST CORRECT → STOP
        }
      }

      const score = passed ? 100 : 0;

      recordSubmission(roomID, socket.id, score);

      // 🔥 FIRST CORRECT SUBMISSION WINS
      if (passed) {
        decideWinner(roomID, io, socket.id);
      }
    });

    // ▶ OPPONENT TYPING
    socket.on("opponent_typing", ({ roomID, code }) => {
      socket.to(roomID).emit("opponent_typing", code);
    });

    // ▶ PLAYER QUIT
    socket.on("player_quit", ({ roomID }) => {
      if (!roomTimers[roomID]) return;

      stopBattleTimer(roomID);
      decideWinnerOnQuit(roomID, socket.id, io);
      socket.leave(roomID);
    });
  });
}
