import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../lib/socket";

import PlayerPanels from "./components/PlayerPanels";
import ProblemPanel from "./components/ProblemPanel";
import Timer from "./components/Timer";
import CodeEditor from "./components/CodeEditor";
import OpponentPreview from "./components/OpponentPreview";
import ProgressBar from "./components/ProgressBar";
import RunOutput from "./components/RunOutput";
import WinnerModal from "./components/WinnerModal";
import QuitConfirmModal from "./components/QuitConfirmModal";

import useBattleSocket from "./hooks/useBattleSocket";

export type Player = {
  email: string;
  [k: string]: any;
};

type Props = {
  roomID: string;
  you: Player;
  opponent: Player;
};

export default function BattlePage({ roomID, you, opponent }: Props) {
  // 🔍 MOUNT LOG
  console.log("⚔️ BattlePage mounted", {
    roomID,
    you: you?.email,
    opponent: opponent?.email,
  });

  useBattleSocket(roomID);

  const navigate = useNavigate();

  // ✅ browser-safe timeout type
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [battleResult, setBattleResult] = useState<any>(null);
  const [showQuit, setShowQuit] = useState(false);

  /**
   * FINAL RESULT FLOW
   * 1. Show winner/loser/draw
   * 2. Wait 5 seconds
   * 3. Leave socket room
   * 4. Redirect dashboard
   */
  useEffect(() => {
    console.log("📡 Attaching battle_result listener for room:", roomID);

    const onBattleResult = (data: any) => {
      console.log("🎯 BATTLE RESULT RECEIVED (frontend):", data);

      // prevent double overwrite
      setBattleResult((prev: any) => {
        if (prev) {
          console.warn("⚠️ battleResult already set, ignoring new value");
          return prev;
        }
        return data;
      });

      console.log("⏳ Starting redirect timer (5s)");

      redirectTimer.current = setTimeout(() => {
        console.log("🚪 Leaving room & redirecting to dashboard");
        socket.emit("leave_room", { roomID });
        navigate("/pd");
      }, 5000);
    };

    socket.on("battle_result", onBattleResult);

    return () => {
      console.log("🧹 Cleaning up battle_result listener");
      socket.off("battle_result", onBattleResult);

      if (redirectTimer.current) {
        console.log("⛔ Clearing redirect timer");
        clearTimeout(redirectTimer.current);
      }
    };
  }, [navigate, roomID]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center">
      {/* QUIT BUTTON (disabled once result is shown) */}
      {!battleResult && (
        <button
          onClick={() => setShowQuit(true)}
          className="absolute top-6 right-6 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold z-20"
        >
          Quit
        </button>
      )}

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* HEADER */}
      <div className="text-center mt-8 z-10">
        <h1 className="text-5xl font-bold text-blue-300">
          BATTLE ARENA ⚔️
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Room ID: <span className="text-blue-400">{roomID}</span>
        </p>
      </div>

      {/* PLAYERS */}
      <div className="mt-10 z-10">
        <PlayerPanels you={you} opponent={opponent} />
      </div>

      {/* MAIN GRID */}
      <div className="mt-10 w-full max-w-7xl px-6 space-y-6 z-10">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <ProblemPanel roomID={roomID} />
          </div>
          <div className="col-span-1">
            <Timer />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <CodeEditor roomID={roomID} />
          <OpponentPreview />
        </div>

        <ProgressBar />
      </div>

      {/* RUN OUTPUT */}
      <RunOutput roomID={roomID} />

      {/* RESULT MODAL */}
      {battleResult && <WinnerModal result={battleResult} />}

      {/* QUIT CONFIRM */}
      {showQuit && !battleResult && (
        <QuitConfirmModal
          roomID={roomID}
          onClose={() => setShowQuit(false)}
        />
      )}
    </div>
  );
}
