import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Settings,
  BarChart3,
  LogOut,
  History,
  Trophy,
} from "lucide-react";

// ✅ leaderboard APIs (adjust path if needed)
import { fetchLeaderboard, fetchMyRank } from "../../leaderboard/api/leaderboard-api";

/* =======================
   RANK UTILS (INLINE)
======================= */
function getRank(points: number) {
  if (points >= 200) return { name: "Challenger", color: "bg-red-600" };
  if (points >= 121) return { name: "Diamond", color: "bg-purple-600" };
  if (points >= 71) return { name: "Platinum", color: "bg-blue-600" };
  if (points >= 31) return { name: "Gold", color: "bg-yellow-500" };
  if (points >= 11) return { name: "Silver", color: "bg-gray-400" };
  return { name: "Bronze", color: "bg-orange-600" };
}

const PlayerDashboard = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const [points, setPoints] = useState(0);
  const [globalRank, setGlobalRank] = useState<number | null>(null);

  // 🚨 BLOCK ACCESS IF NO TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/ds");
  }, [navigate]);

  // 🏅 FETCH RANK DATA
  useEffect(() => {
    if (!email) return;

    Promise.all([fetchLeaderboard(), fetchMyRank(email)])
      .then(([leaderboardRes, rankRes]) => {
        const me = leaderboardRes.data.leaderboard.find(
          (p: any) => p._id === email
        );

        setPoints(me?.points ?? 0);
        setGlobalRank(rankRes.data.rank ?? null);
      })
      .catch(() => {
        setPoints(0);
        setGlobalRank(null);
      });
  }, [email]);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const rank = getRank(points);

  return (
    <div className="min-h-screen w-full flex bg-black text-white relative overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-40"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
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
        <h2 className="text-2xl font-bold mb-8 text-purple-300">
          Code & Chaos
        </h2>

        <nav className="flex-1 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active
            onClick={() => navigate("/pd")}
          />
          <SidebarItem
            icon={<History />}
            label="Match History"
            onClick={() => navigate("/match-history")}
          />
          <SidebarItem
            icon={<Trophy />}
            label="Leaderboard"
            onClick={() => navigate("/leaderboard")}
          />
          <SidebarItem
            icon={<BarChart3 />}
            label="Stats"
            onClick={() => navigate("/stats")}
          />
          <SidebarItem icon={<User />} label="Profile" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-6 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
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
          <h1 className="text-3xl font-bold text-purple-200 mb-2">
            Player Dashboard
          </h1>

          <p className="text-gray-300 mb-4">
            Welcome to the futuristic realm of Code & Chaos ⚔️
          </p>

          {/* 🏅 RANK BADGE */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`px-4 py-2 rounded-full text-sm font-bold text-white ${rank.color}`}
            >
              🏅 {rank.name}
            </div>

            <div className="text-sm text-gray-300">
              <p>{points} pts</p>
              {globalRank && <p>Rank #{globalRank}</p>}
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionCard
              title="Ready for Battle?"
              desc="Enter the matchmaking arena and face a worthy opponent."
              buttonText="Start Matchmaking"
              onClick={() => navigate("/mm")}
              color="purple"
            />

            <ActionCard
              title="Battle Records"
              desc="Review your past matches, results and outcomes."
              buttonText="View Match History"
              onClick={() => navigate("/match-history")}
              color="blue"
            />

            <ActionCard
              title="Hall of Fame"
              desc="See the top warriors and your global rank."
              buttonText="View Leaderboard"
              onClick={() => navigate("/leaderboard")}
              color="gold"
            />

            <ActionCard
              title="Your Stats"
              desc="Track your performance, rank and progress."
              buttonText="View Stats"
              onClick={() => navigate("/stats")}
              color="green"
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

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: any) => (
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

const ActionCard = ({
  title,
  desc,
  buttonText,
  onClick,
  color,
}: any) => {
  const colors: any = {
    purple: "bg-purple-600 hover:bg-purple-700 shadow-purple-700/40",
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-700/40",
    gold: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-600/40",
    green: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-700/40",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
    >
      <h2 className="text-2xl font-semibold text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-300 mb-6">{desc}</p>

      <button
        onClick={onClick}
        className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all ${colors[color]}`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default PlayerDashboard;
