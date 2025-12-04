import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function OpponentPreview() {
  const [preview, setPreview] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on("opponent_typing", setTyping);
    socket.on("opponent_preview", setPreview);

    return () => {
      socket.off("opponent_typing");
      socket.off("opponent_preview");
    };
  }, []);

  return (
    <div className="bg-white/5 p-4 border border-white/15 rounded-xl min-h-[320px]">
      <p className="text-sm text-gray-400">
        Opponent Preview {typing && "• typing..."}
      </p>

      <pre
        className="bg-black/40 p-4 rounded border border-white/10 text-xs opacity-75"
        style={{ filter: "blur(4px)" }}
      >
        {preview || "// waiting for opponent..."}
      </pre>
    </div>
  );
}
