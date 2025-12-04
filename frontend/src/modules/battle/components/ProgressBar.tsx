import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function ProgressBar() {
  const [you, setYou] = useState(0);
  const [opp, setOpp] = useState(0);

  useEffect(() => {
    socket.on("progress_update", ({ player, passed }) => {
      if (player === "you") setYou(passed);
      else setOpp(passed);
    });

    socket.on("opponent_progress", (passed) => setOpp(passed));

    return () => {
      socket.off("progress_update");
      socket.off("opponent_progress");
    };
  }, []);

  return (
    <div className="bg-white/5 p-3 border border-white/15 rounded-xl">
      <p className="text-xs text-gray-400 mb-1">Testcase Progress</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs">You</p>
          <div className="h-3 bg-black/40 rounded overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${you * 100}%` }} />
          </div>
        </div>

        <div>
          <p className="text-xs">Opponent</p>
          <div className="h-3 bg-black/40 rounded overflow-hidden">
            <div className="h-full bg-pink-500" style={{ width: `${opp * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
