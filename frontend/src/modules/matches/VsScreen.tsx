import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchData = location.state;

  useEffect(() => {
    if (!matchData) navigate("/player/dashboard");
  }, []);

  const roomID = matchData?.roomID;
  const players = matchData?.players || [];
  const myEmail = localStorage.getItem("email");

  // 🔥 Fix: Determine YOU and OPPONENT using email
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

  // After animation → move to battle
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/battle/${roomID}`, { state: matchData });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!matchData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* GLOWING BACKGROUND */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-700 rounded-full blur-[220px] opacity-20 -top-10 -left-10"
        animate={{ x: [-80, 80, -80], y: [-40, 40, -40] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[200px] opacity-20 bottom-10 right-10"
        animate={{ x: [60, -60, 60], y: [40, -40, 40] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* YOU */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/10 p-6 border border-white/20 rounded-xl shadow-xl backdrop-blur-xl text-center w-64"
      >
        <h2 className="text-2xl text-blue-300 font-bold mb-2">YOU</h2>
        <p className="text-gray-200">{you.email}</p>
      </motion.div>

      {/* VS */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1.2, 1], opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute text-7xl font-extrabold text-blue-400 drop-shadow-[0_0_20px_#3b82f6]"
      >
        VS
      </motion.div>

      {/* OPPONENT */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/10 p-6 border border-white/20 rounded-xl shadow-xl backdrop-blur-xl text-center w-64"
      >
        <h2 className="text-2xl text-purple-300 font-bold mb-2">OPPONENT</h2>
        <p className="text-gray-200">{opponent.email}</p>
      </motion.div>
    </div>
  );
};

export default VsScreen;
