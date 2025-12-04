import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, User, Settings, BarChart3, LogOut } from "lucide-react";

const PlayerDashboard = () => {
  const navigate = useNavigate();

  // 🚨 BLOCK ACCESS IF NO TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/player/login");
  }, []);

  // 🚨 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white relative overflow-hidden">

      {/* 🌌 CYBERPUNK MOVING BACKGROUND */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-40"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 -top-10 -left-10"
        animate={{ x: [0, 60, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 bottom-10 right-10"
        animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* SIDEBAR */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col z-20">
        <h2 className="text-2xl font-bold mb-8 text-purple-300">Code & Chaos</h2>

        <nav className="flex-1 space-y-4">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
          <SidebarItem icon={<User />} label="Profile" />
          <SidebarItem icon={<BarChart3 />} label="Stats" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-5 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-purple-200 mb-4">Player Dashboard</h1>
          <p className="text-gray-300">
            Welcome to the futuristic realm of Code & Chaos ⚔️
          </p>

          {/* MATCHMAKING CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              Ready for Battle?
            </h2>
            <p className="text-gray-300 mb-6">
              Enter the matchmaking arena and face a worthy opponent in real-time.
            </p>

            <button
              onClick={() => navigate("/mm")}
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold tracking-wide shadow-md shadow-purple-700/40 transition-all"
            >
              Start Matchmaking
            </button>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: any) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
        ${active ? "bg-purple-600/40 text-purple-200" : "hover:bg-white/10 text-gray-300"}
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default PlayerDashboard;
