import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, User, Settings, BarChart3, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 🔐 Protect admin routes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/admin/login");
    }
  }, []);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-white relative overflow-hidden">

      {/* PURPLE + BLUE FLOATING GLOW (IDENTICAL TO PLAYER) */}
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

      {/* RINGS (EXACT SAME) */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full border-4 border-purple-600/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute w-[650px] h-[650px] rounded-full border-4 border-blue-500/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* DOT GRID (SAME) */}
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

      {/* SIDEBAR (SAME THEME) */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col z-20">
        <h2 className="text-2xl font-bold mb-8 text-purple-300">Code & Chaos</h2>

        <nav className="flex-1 space-y-4">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active />
          <SidebarItem icon={<User />} label="Admins" />
          <SidebarItem icon={<BarChart3 />} label="Analytics" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-5 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-purple-200 mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">Welcome Admin — manage players, control the system and oversee analytics.</p>

          {/* Admin widgets will go here */}
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

export default AdminDashboard;
