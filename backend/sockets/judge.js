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

    socket.on("run_code", async ({ roomID, language, source_code, stdin }) => {
      if (!roomTimers[roomID]) return;

      const result = await runWithPiston({
        language,
        source_code,
        stdin,
      });

      io.to(roomID).emit("code_result", { roomID, ...result });
    });

    socket.on("submit_code", async ({ roomID, language, source_code }) => {
      if (!roomTimers[roomID]) return;

      const question = roomQuestions[roomID];
      if (!question) return;

      let passed = 0;

      for (const tc of question.testcases) {
        const res = await runWithPiston({
          language,
          source_code,
          stdin: tc.stdin,
        });

        if (res.stdout.trim() === tc.expected_output.trim()) {
          passed++;
        }
      }

      const score = Math.round(
        (passed / question.testcases.length) * 100
      );

      recordSubmission(roomID, socket.id, score);

      decideWinner(roomID, io);
    });

    socket.on("player_quit", ({ roomID }) => {
      if (!roomTimers[roomID]) return;

      stopBattleTimer(roomID);
      decideWinnerOnQuit(roomID, socket.id, io);
      socket.leave(roomID);
    });
  });
}
