import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import socket from "../../lib/socket";


const Matchmaking = () => {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState("Searching for opponent...");
  const [dots, setDots] = useState("");

  // Animated dots (...)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Join matchmaking queue
  useEffect(() => {
    const playerData = {
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
    };

    socket.emit("join_queue", playerData);

    socket.on("match_found", (data) => {
      setStatusText("Match Found! Preparing Arena...");

      // ⭐ ONLY CHANGE: Redirect to VS Screen instead of Battle
      setTimeout(() => {
        navigate("/vs", { state: data });
      }, 1500);
    });

    return () => {
      socket.off("match_found");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* GLOW BALL 1 */}
      <motion.div
        className="absolute w-[900px] h-[900px] bg-blue-700 rounded-full blur-[220px] opacity-20 -top-10 -left-10"
        animate={{ x: [-80, 80, -80], y: [-40, 40, -40] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* GLOW BALL 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[180px] opacity-20 bottom-10 right-10"
        animate={{ x: [60, -60, 60], y: [40, -40, 40] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* ROTATING OUTER RING */}
      <motion.div
        className="absolute w-[650px] h-[650px] rounded-full border-[3px] border-blue-500/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* ROTATING INNER RING */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full border-[3px] border-blue-300/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* SCANNING PULSE */}
      <motion.div
        className="absolute w-[180px] h-[180px] rounded-full border border-blue-400"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* CENTER CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl font-bold text-blue-300 mb-4 tracking-wide">
          Matchmaking
        </h1>

        <p className="text-lg text-gray-300 mb-6">
          {statusText}
          <span className="inline-block w-6">{dots}</span>
        </p>

        {/* Animated search icon */}
        <motion.div
          className="mx-auto w-24 h-24 border-4 border-blue-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-10 h-10 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Matchmaking;
