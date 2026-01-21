// backend/sockets/judge.js
import { runWithPiston } from "../utils/pistonRunner.js";
import { roomQuestions } from "./questions.js";

export default function judge(io) {
  io.on("connection", (socket) => {

    // 🔹 RUN CODE (no testcase verification)
    socket.on("run_code", async ({ roomID, language, source_code, stdin }) => {
      console.log("▶ RUN_CODE", { roomID, language });

      const result = await runWithPiston({
        language,
        source_code,
        stdin
      });

      io.to(roomID).emit("code_result", {
        roomID,
        ...result
      });
    });

    // 🔹 SUBMIT CODE (verify against testcases)
    socket.on("submit_code", async ({ roomID, language, source_code }) => {
      console.log("▶ SUBMIT_CODE", { roomID, language });

      const question = roomQuestions[roomID];
      if (!question) {
        console.log("❌ No question for room:", roomID);
        return;
      }

      let passed = 0;
      const results = [];

      for (const tc of question.testcases) {
        const res = await runWithPiston({
          language,
          source_code,
          stdin: tc.stdin
        });

        const stdout = res.stdout.trim();
        const expected = tc.expected_output.trim();
        const ok = stdout === expected;

        console.log("🧪 TC", {
          stdin: tc.stdin,
          stdout,
          expected,
          ok
        });

        if (ok) passed++;

        results.push({
          input: tc.stdin,
          output: stdout,
          expected,
          passed: ok
        });
      }

      const score = Math.round((passed / question.testcases.length) * 100);

      io.to(roomID).emit("submit_result", {
        roomID,
        score,
        passed,
        total: question.testcases.length,
        results
      });

      console.log(`🧪 Room ${roomID} → ${score}%`);
    });
  });
}
