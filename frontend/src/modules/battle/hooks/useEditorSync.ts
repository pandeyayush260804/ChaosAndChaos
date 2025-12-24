import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function useEditorSync(roomID?: string) {
  const [code, setCode] = useState("");
  const [opponentCode, setOpponentCode] = useState("");

  // when *you* type
  const setCodeLocal = (value: string) => {
    setCode(value);

    socket.emit("typing", {
      roomID,
      typing: value,
    });
  };

  useEffect(() => {
    if (!roomID) return;

    // receive opponent typing
    socket.on("opponent_typing", (value: string) => {
      setOpponentCode(value);
    });

    return () => {
      socket.off("opponent_typing");
    };
  }, [roomID]);

  return { code, opponentCode, setCodeLocal };
}
