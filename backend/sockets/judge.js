// sockets/judge.js
import axios from "axios";

const JUDGE_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

export default function judge(io) {
  io.on("connection", (socket) => {
    
    socket.on("run_code", async ({ roomID, language_id, source_code, stdin }) => {
      try {
        const response = await axios.post(
          JUDGE_URL,
          {
            language_id,
            source_code,
            stdin
          },
          {
            headers: {
              "X-RapidAPI-Key": process.env.JUDGE_API_KEY,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
            }
          }
        );

        io.to(roomID).emit("code_result", response.data);

      } catch (err) {
        io.to(roomID).emit("code_result", { error: "Execution Failed" });
      }
    });

  });
}
