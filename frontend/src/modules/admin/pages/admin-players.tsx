import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getAllAdminPlayers,
  searchAdminPlayer,
} from "../api/admin-api";

type Player = {
  _id: string;      // email
  wins: number;
  losses: number;
  matches: number;
  winRate?: number;
};

export default function AdminPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllAdminPlayers()
      .then((res) => {
        setPlayers(res.data.players || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async () => {
    if (!email.trim()) return;

    const res = await searchAdminPlayer(email);
    setPlayers(res.data.player ? [res.data.player] : []);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">
        Player Stats
      </h1>

      {/* SEARCH */}
      <div className="flex gap-3 mb-6">
        <input
          className="bg-black border border-white/20 rounded px-3 py-2 w-80"
          placeholder="Search by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 border border-white/20 rounded-xl overflow-hidden"
      >
        {loading ? (
          <div className="p-6 text-gray-400">Loading players...</div>
        ) : players.length === 0 ? (
          <div className="p-6 text-gray-400">No players found</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/10 text-purple-300">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Wins</th>
                <th className="p-3">Losses</th>
                <th className="p-3">Matches</th>
                <th className="p-3">Win %</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="p-3 truncate max-w-[260px]">
                    {p._id}
                  </td>
                  <td className="p-3 text-green-400">{p.wins}</td>
                  <td className="p-3 text-red-400">{p.losses}</td>
                  <td className="p-3">{p.matches}</td>
                  <td className="p-3 text-purple-300">
                    {p.winRate ? `${p.winRate.toFixed(1)}%` : "—"}
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
