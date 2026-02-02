import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  LogOut,
  Trophy,
  History,
  Users,
  ChevronRight,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 🔐 Protect admin routes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white relative overflow-hidden">
      {/* ===== BACKGROUND EFFECTS ===== */}
      <motion.div
        className="absolute w-[900px] h-[900px] bg-purple-700 rounded-full blur-3xl opacity-20 -top-10 -left-10"
        animate={{ x: [0, 60, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[650px] h-[650px] bg-blue-600 rounded-full blur-3xl opacity-20 bottom-10 right-10"
        animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col z-20">
        <h2 className="text-2xl font-bold mb-8 text-purple-300">
          Code & Chaos
        </h2>

        <nav className="flex-1 space-y-3">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active
            onClick={() => navigate("/admin")}
          />
          <SidebarItem
            icon={<History />}
            label="All Matches"
            onClick={() => navigate("/admin/matches")}
          />
          <SidebarItem
            icon={<Users />}
            label="Players"
            onClick={() => navigate("/admin/players")}
          />
          <SidebarItem
            icon={<Trophy />}
            label="Leaderboard"
            onClick={() => navigate("/admin/leaderboard")}
          />
          <SidebarItem
            icon={<BarChart3 />}
            label="Analytics"
            onClick={() => navigate("/admin/analytics")}
          />
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            onClick={() => navigate("/admin/settings")}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-5 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl max-w-3xl"
        >
          <h1 className="text-3xl font-bold text-purple-200 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-300 mb-8">
            Manage matches, players, leaderboard and system controls.
          </p>

          {/* ===== SINGLE COLUMN ACTION LIST ===== */}
          <div className="space-y-4">
            <ActionRow
              title="All Matches"
              desc="View all matches (1 record per room)"
              icon={<History />}
              onClick={() => navigate("/admin/matches")}
            />

            <ActionRow
              title="Player Stats"
              desc="View & search player performance"
              icon={<Users />}
              onClick={() => navigate("/admin/players")}
            />

            <ActionRow
              title="Global Leaderboard"
              desc="Top N players across the platform"
              icon={<Trophy />}
              onClick={() => navigate("/admin/leaderboard")}
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

/* =======================
   REUSABLE COMPONENTS
======================= */

const SidebarItem = ({ icon, label, active = false, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
      ${
        active
          ? "bg-purple-600/40 text-purple-200"
          : "hover:bg-white/10 text-gray-300"
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </div>
);

const ActionRow = ({ title, desc, icon, onClick }: any) => (
  <motion.div
    whileHover={{ x: 6 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl p-5 cursor-pointer hover:bg-white/15 transition-all"
  >
    <div className="flex items-center gap-4">
      <div className="text-purple-300">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>

    <ChevronRight className="text-gray-400" />
  </motion.div>
);

export default AdminDashboard;
