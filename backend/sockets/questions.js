// backend/sockets/questions.js
import { startBattleTimer } from "../utils/battleTimer.js";

const QUESTIONS = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: "Find two numbers that add up to the target.",
    difficulty: "Easy",
    testcases: [
      { stdin: "2 7\n", expected_output: "9\n" },
      { stdin: "3 4\n", expected_output: "7\n" },
      { stdin: "10 20\n", expected_output: "30\n" },
      { stdin: "1 99\n", expected_output: "100\n" }
    ]
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list.",
    difficulty: "Medium",
    testcases: [
      { stdin: "1 2 3 4\n", expected_output: "4 3 2 1\n" },
      { stdin: "5 6\n", expected_output: "6 5\n" }
    ]
  }
];

// roomID -> locked question
export const roomQuestions = {};

export default function questions(io) {
  io.on("connection", (socket) => {
    socket.on("request_question", (roomID) => {
      if (roomQuestions[roomID]) return;

      const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
      roomQuestions[roomID] = q;

      io.to(roomID).emit("question_sent", {
        id: q.id,
        title: q.title,
        description: q.description,
        difficulty: q.difficulty
      });

      // ⏱️ START 5‑MINUTE TIMER
      startBattleTimer(io, roomID, 300);

      console.log("📨 Question locked:", roomID, q.id);
    });
  });
}
