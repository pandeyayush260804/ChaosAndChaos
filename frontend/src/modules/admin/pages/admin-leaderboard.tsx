import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { getAdminLeaderboard } from "../api/admin-api";

type Player = {
  _id: string; // email
  wins: number;
  losses: number;
  draws: number;
  matches: number;
  points: number;
};

export default function AdminLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAdminLeaderboard(limit)
      .then((res) => {
        setPlayers(res.data.leaderboard || []);
      })
      .finally(() => setLoading(false));
  }, [limit]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-300 flex items-center gap-3">
          <Trophy className="text-yellow-400" />
          Global Leaderboard
        </h1>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="bg-black border border-white/20 px-4 py-2 rounded-lg text-white"
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={25}>Top 25</option>
          <option value={50}>Top 50</option>
        </select>
      </div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 border border-white/20 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="p-10 text-center text-gray-400">
            Loading leaderboard...
          </div>
        ) : players.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No leaderboard data found
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/10 text-purple-300">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Player</th>
                <th className="p-4">Wins</th>
                <th className="p-4">Losses</th>
                <th className="p-4">Matches</th>
                <th className="p-4">Points</th>
              </tr>
            </thead>

            <tbody>
              {players.map((p, index) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-gray-400">#{index + 1}</td>
                  <td className="p-4 text-white truncate max-w-[260px]">
                    {p._id}
                  </td>
                  <td className="p-4 text-green-400">{p.wins}</td>
                  <td className="p-4 text-red-400">{p.losses}</td>
                  <td className="p-4">{p.matches}</td>
                  <td className="p-4 text-purple-300 font-semibold">
                    {p.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
