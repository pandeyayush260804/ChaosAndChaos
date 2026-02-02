import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllAdminMatches } from "../api/admin-api";

type Match = {
  _id: string;          // roomID
  players: string[];   // [email1, email2]
  reason: string;      // win_reason / quit
  createdAt?: string;
};

export default function AdminMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllAdminMatches()
      .then((res) => {
        setMatches(res.data.matches || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold text-purple-300 mb-8">
        All Matches
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {loading ? (
          <div className="text-gray-400">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="text-gray-400">No matches found</div>
        ) : (
          matches.map((m) => (
            <div
              key={m._id}
              className="bg-white/10 border border-white/20 rounded-xl p-5"
            >
              <p className="text-sm text-gray-400">
                Room ID: {m._id}
              </p>

              <p className="mt-2 font-medium">
                {m.players?.join("  vs  ")}
              </p>

              <p className="text-sm text-purple-400 mt-1">
                Reason: {m.reason}
              </p>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
