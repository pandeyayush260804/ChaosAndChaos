import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Battle = () => {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const matchData = location.state;

  // If someone manually enters URL without match data
  useEffect(() => {
    if (!matchData || !matchData.players) {
      navigate("/player/dashboard");
    }
  }, []);

  if (!matchData || !matchData.players) return null;

  const players = matchData.players;
  const myEmail = localStorage.getItem("email");

  // 🎯 Fix: Determine YOU and OPPONENT based on logged-in email
  let you = players[0];
  let opponent = players[1];

  if (players.length === 2 && myEmail) {
    if (players[0].email === myEmail) {
      you = players[0];
      opponent = players[1];
    } else {
      you = players[1];
      opponent = players[0];
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-700 rounded-full blur-[200px] opacity-20 -top-20 -left-20"
        animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-700 rounded-full blur-[180px] opacity-20 bottom-10 right-10"
        animate={{ x: [50, -50, 50], y: [30, -30, 30] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-blue-300 tracking-wide">
        Battle Arena ⚔️
      </h1>

      <p className="text-lg text-gray-300 mb-10">
        Room ID: <span className="text-blue-400">{roomID}</span>
      </p>

      {/* Players Panel */}
      <div className="flex gap-20">

        {/* YOU */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 border border-white/20 p-6 rounded-2xl w-64 text-center backdrop-blur-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-blue-300">You</h2>
          <p className="mt-2 text-gray-200">{you.email}</p>
        </motion.div>

        {/* VS */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl font-bold text-white tracking-wider"
        >
          VS
        </motion.div>

        {/* OPPONENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 border border-white/20 p-6 rounded-2xl w-64 text-center backdrop-blur-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-purple-300">Opponent</h2>
          <p className="mt-2 text-gray-200">{opponent.email}</p>
        </motion.div>
      </div>

      {/* Placeholder for future components */}
      <div className="mt-14 text-gray-400">
        (Code editor, timer, and scoring will appear here)
      </div>
    </div>
  );
};

export default Battle;
