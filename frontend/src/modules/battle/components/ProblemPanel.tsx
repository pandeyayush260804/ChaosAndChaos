import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function ProblemPanel() {
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    // Register listener
    socket.on("question_sent", setQuestion);

    // Cleanup must return void, not a socket
    return () => {
      socket.off("question_sent", setQuestion);
    };
  }, []);

  return (
    <div className="flex-1 bg-white/5 p-4 border border-white/15 rounded-xl">
      <p className="text-sm text-gray-400">Problem</p>

      <h2 className="text-lg text-blue-300">
        {question?.title || "Waiting for problem..."}
      </h2>

      <p className="text-gray-300">
        {question?.description || ""}
      </p>
    </div>
  );
}
