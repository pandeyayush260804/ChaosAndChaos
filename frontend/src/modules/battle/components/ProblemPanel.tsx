// ProblemPanel.tsx
import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

type ProblemPanelProps = {
  roomID?: string;
};

export default function ProblemPanel({ roomID }: ProblemPanelProps) {
  const [question, setQuestion] = useState<any>(null);

  useEffect(() => {
    if (!roomID) return;

    const handleQuestion = (q: any) => {
      console.log("🧩 question_sent received:", q);
      setQuestion(q);
    };

    // Listen for question events for the room
    socket.on("question_sent", handleQuestion);

    // (Optional) Request again as a backup — not required if useBattleSocket requests after join ack,
    // but safe to keep in noisy networks. Comment out if you prefer single-source request.
    // socket.emit("request_question", roomID);

    return () => {
      socket.off("question_sent", handleQuestion);
    };
  }, [roomID]);

  return (
    <div className="flex-1 bg-white/5 p-4 border border-white/15 rounded-xl">
      <p className="text-sm text-gray-400">Problem</p>

      <h2 className="text-lg text-blue-300">
        {question?.title || "Waiting for problem..."}
      </h2>

      <p className="text-gray-300">{question?.description || ""}</p>
    </div>
  );
}
