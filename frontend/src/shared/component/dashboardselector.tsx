
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";

const DashboardSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 relative overflow-hidden">

      {/* Animated background orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"
        animate={{ x: [0, 80, -80, 0], y: [0, -60, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-indigo-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"
        animate={{ x: [0, -60, 60, 0], y: [0, 80, -80, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
          Choose Your Role
        </h1>
        <p className="text-gray-300 mb-8 text-sm">
          Select how you want to enter the Code & Chaos universe
        </p>

        <div className="flex flex-col gap-5">

          {/* Admin Button */}
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(59, 230, 219, 0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-3 py-5 rounded-xl bg-white/10 border border-indigo-500/40 text-indigo-300 hover:bg-white/20 backdrop-blur-md transition-all"
          >
            <Shield className="w-7 h-7 text-indigo-300" />
            <span className="text-lg font-semibold">Enter as Admin</span>
          </motion.button>

          {/* Player Button */}
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(34, 197, 94, 0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/Plogin")}
            className="flex items-center justify-center gap-3 py-5 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all shadow-lg"
          >
            <User className="w-7 h-7 text-white" />
            <span className="text-lg font-semibold">Enter as Player</span>
          </motion.button>

        </div>

      </motion.div>
    </div>
  );
};

export default DashboardSelector;
