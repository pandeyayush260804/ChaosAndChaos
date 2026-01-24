import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import socket from "../../lib/socket";

import PlayerPanels from "./components/PlayerPanels";
import ProblemPanel from "./components/ProblemPanel";
import Timer from "./components/Timer";
import CodeEditor from "./components/CodeEditor";
import OpponentPreview from "./components/OpponentPreview";
import ProgressBar from "./components/ProgressBar";
import RunOutput from "./components/RunOutput";
import WinnerModal from "./components/WinnerModal";
import QuitConfirmModal from "./components/QuitConfirmModal"; // 🆕 NEW

import useBattleSocket from "./hooks/useBattleSocket";

export type Player = { email: string; [k: string]: any };

type Props = {
  roomID: string;
  you: Player;
  opponent: Player;
};

export default function BattlePage({ roomID, you, opponent }: Props) {
  useBattleSocket(roomID);

  const [battleResult, setBattleResult] = useState<any>(null);
  const [showQuit, setShowQuit] = useState(false); // 🆕 NEW

  // 🏆 Listen for winner result
  useEffect(() => {
    socket.on("battle_result", (data) => {
      console.log("🏆 Battle Result:", data);
      setBattleResult(data);
    });

    return () => {
      socket.off("battle_result");
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center">

      {/* 🔴 QUIT BUTTON (NEW) */}
      <button
        onClick={() => setShowQuit(true)}
        className="absolute top-6 right-6 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold z-20"
      >
        Quit
      </button>

      {/* ✨ Cyber Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

      {/* ✨ Moving Neon Lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* ✨ Floating Neon Orbs */}
      <motion.div
        className="absolute w-[900px] h-[900px] bg-blue-700 rounded-full blur-[250px] opacity-20 -top-40 -left-40"
        animate={{ x: [-80, 80, -80], y: [-50, 50, -50] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-purple-700 rounded-full blur-[220px] opacity-20 bottom-40 right-40"
        animate={{ x: [60, -60, 60], y: [40, -40, 40] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* 🔹 HEADER */}
      <div className="text-center mt-8 z-10">
        <h1 className="text-5xl font-bold text-blue-300 drop-shadow-[0_0_12px_#3b82f6]">
          BATTLE ARENA ⚔️
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Room ID:{" "}
          <span className="text-blue-400 font-semibold">{roomID}</span>
        </p>
      </div>

      {/* 🔹 PLAYER PANELS */}
      <div className="mt-10 z-10">
        <PlayerPanels you={you} opponent={opponent} />
      </div>

      {/* 🔹 MAIN GRID */}
      <div className="mt-10 w-full max-w-7xl px-6 space-y-6 z-10">

        {/* TOP ROW → Problem + Timer */}
        <div className="grid grid-cols-4 gap-6">

          {/* Problem Panel */}
          <div className="col-span-3">
            <div className="text-xs text-blue-400 font-mono mb-1">
              ProblemPanel.tsx
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-white/5 backdrop-blur-xl p-4 shadow-lg">
              <ProblemPanel roomID={roomID} />
            </div>
          </div>

          {/* Timer */}
          <div className="col-span-1">
            <div className="text-xs text-blue-400 font-mono mb-1">
              Timer.tsx
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-white/5 backdrop-blur-xl p-4 shadow-lg">
              <Timer />
            </div>
          </div>
        </div>

        {/* MIDDLE ROW → Code Editor + Opponent Preview */}
        <div className="grid grid-cols-2 gap-6">

          {/* Code Editor */}
          <div>
            <div className="text-xs text-blue-400 font-mono mb-1">
              CodeEditor.tsx
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
              <CodeEditor roomID={roomID} />
            </div>
          </div>

          {/* Opponent Preview */}
          <div>
            <div className="text-xs text-pink-400 font-mono mb-1">
              OpponentPreview.tsx
            </div>
            <div className="rounded-xl border border-pink-500/30 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
              <OpponentPreview />
            </div>
          </div>
        </div>

        {/* BOTTOM ROW → Progress Bar */}
        <div>
          <div className="text-xs text-green-400 font-mono mb-1">
            ProgressBar.tsx
          </div>
          <div className="rounded-xl border border-green-500/30 bg-white/5 backdrop-blur-xl p-4 shadow-lg">
            <ProgressBar />
          </div>
        </div>
      </div>

      {/* ⭐ FLOATING RUN OUTPUT PANEL ⭐ */}
      <RunOutput roomID={roomID} />

      {/* 🏆 WINNER MODAL */}
      {battleResult && <WinnerModal result={battleResult} />}

      {/* 🔴 QUIT CONFIRM MODAL (NEW) */}
      {showQuit && (
        <QuitConfirmModal
          roomID={roomID}
          onClose={() => setShowQuit(false)}
        />
      )}

    </div>
  );
}
