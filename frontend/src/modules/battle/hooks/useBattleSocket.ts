import { useEffect } from "react";
import socket from "../../../lib/socket";

export default function useBattleSocket(roomID: string) {
  useEffect(() => {
    if (!roomID) return;

    socket.emit("request_question", roomID);

    socket.on("code_result", (res) => console.log("Judge0 result:", res));

    return () => {
      socket.off("code_result");
    };
  }, [roomID]);
}
