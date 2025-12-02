import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">

      {/* 🔵 MOVING PURPLE NEON GLOW */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-purple-700 rounded-full blur-[200px] opacity-20"
        animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🔮 MOVING BLUE NEON GLOW */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-700 rounded-full blur-[180px] opacity-20"
        animate={{ x: [80, -80, 80], y: [60, -60, 60] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🔥 ROTATING OUTER RING */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full border-[3px] border-purple-500/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* 🔥 ROTATING INNER RING */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full border-[3px] border-blue-500/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* ⭐ CENTER DOT GRID EFFECT */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* MAIN TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
          Code & Chaos
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl mx-auto leading-relaxed">
          Where logic meets the unexpected.
          <br />
          Build. Break. Innovate.
        </p>

        {/* BUTTON */}
        <motion.button
          onClick={() => navigate("/ds")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            mt-10 px-10 py-3 text-lg font-semibold rounded-xl 
            bg-gradient-to-r from-purple-600 to-blue-600 
            hover:from-purple-700 hover:to-blue-700 
            text-white shadow-lg shadow-purple-500/30 transition
          "
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
