// sockets/questions.js

const QUESTIONS = [
  {
    id: 1,
    title: "Two Sum",
    description: "Find two numbers that add up to the target.",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Reverse Linked List",
    description: "Reverse a singly linked list.",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Valid Parentheses",
    description: "Check if parentheses are valid.",
    difficulty: "Easy",
  }
];

export default function questions(io) {
  io.on("connection", (socket) => {
    socket.on("request_question", (roomID) => {
      const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

      io.to(roomID).emit("question_sent", randomQ);
      console.log("📨 Question Sent to Room:", roomID);
    });
  });
}
