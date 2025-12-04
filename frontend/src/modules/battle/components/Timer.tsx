import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function Timer() {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    socket.on("timer_tick", setTime);
    socket.on("timer_start", setTime);
    socket.on("timer_end", () => setTime(0));

    return () => {
      socket.off("timer_tick");
      socket.off("timer_start");
      socket.off("timer_end");
    };
  }, []);

  const format = (s: number | null) =>
    s === null ? "—:—" : `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="w-40 bg-white/5 p-4 rounded-xl border border-white/15 text-center">
      <p className="text-xs text-gray-400">Time Left</p>
      <p className="text-2xl font-bold text-red-400">{format(time)}</p>
    </div>
  );
}
