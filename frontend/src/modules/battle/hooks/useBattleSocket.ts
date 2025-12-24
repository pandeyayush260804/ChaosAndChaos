// useBattleSocket.ts
import { useEffect } from "react";
import socket from "../../../lib/socket";

/**
 * Ensures client joins the server-side room, waits for ack,
 * then requests the question. Also wires judge result listener.
 */
export default function useBattleSocket(roomID?: string) {
  useEffect(() => {
    if (!roomID) return;

    // 1) ask server to join the room
    console.log("➡ join_room emit:", roomID);
    socket.emit("join_room", { roomID });

    // 2) when server acknowledges the join, request the question
    const onJoined = (data: any) => {
      console.log("✅ joined_room ack received:", data);
      socket.emit("request_question", roomID);
    };
    socket.on("joined_room", onJoined);

    // fallback: if ack doesn't arrive within time, request anyway (development safety)
    const fallback = setTimeout(() => {
      console.warn("⏳ joined_room ack not received — fallback request_question");
      socket.emit("request_question", roomID);
    }, 700);

    // listen for judge results (keeps the hook useful)
    const onCodeResult = (res: any) => {
      console.log("Judge result", res);
    };
    socket.on("code_result", onCodeResult);

    // cleanup on unmount / room change
    return () => {
      clearTimeout(fallback);
      socket.off("joined_room", onJoined);
      socket.off("code_result", onCodeResult);
      // optional: tell server we left the room
      socket.emit("leave_room", { roomID });
    };
  }, [roomID]);
}
