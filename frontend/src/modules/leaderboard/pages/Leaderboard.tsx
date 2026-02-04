import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchLeaderboard, fetchMyRank } from "../api/leaderboard-api";
import { Crown } from "lucide-react";

type Player = {
  _id: string;
  wins: number;
  losses: number;
  draws: number;
  matches: number;
  points: number;
};

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);

  const myEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchLeaderboard().then((res) => {
      setPlayers(res.data.leaderboard);
    });

    if (myEmail) {
      fetchMyRank(myEmail).then((res) => {
        setMyRank(res.data.rank);
      });
    }
  }, [myEmail]);

  const podium = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-300">
        🏆 Leaderboard
      </h1>

      {/* 🥇🥈🥉 PODIUM */}
      <div className="flex justify-center gap-6 mb-12">
        {podium.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`w-60 rounded-2xl p-6 text-center shadow-xl
              ${
                i === 0
                  ? "bg-yellow-500/20 border border-yellow-400"
                  : i === 1
                  ? "bg-gray-400/20 border border-gray-300"
                  : "bg-orange-500/20 border border-orange-400"
              }`}
          >
            <Crown
              className={`mx-auto mb-3 ${
                i === 0
                  ? "text-yellow-400"
                  : i === 1
                  ? "text-gray-300"
                  : "text-orange-400"
              }`}
              size={32}
            />

            <p className="font-bold text-lg truncate">{p._id}</p>
            <p className="text-sm text-gray-300 mt-1">
              {p.points} pts
            </p>

            <p className="mt-2 text-xs text-gray-400">
              W {p.wins} · L {p.losses} · D {p.draws}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 📋 REST OF LEADERBOARD */}
      <div className="max-w-5xl mx-auto space-y-3">
        {rest.map((p, index) => {
          const rank = index + 4;
          const isMe = p._id === myEmail;

          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className={`flex justify-between items-center p-4 rounded-xl border
                ${
                  isMe
                    ? "bg-purple-600/30 border-purple-400"
                    : "bg-white/10 border-white/10"
                }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-400 w-8">#{rank}</span>
                <span className="font-semibold truncate max-w-[220px]">
                  {p._id}
                </span>

                {isMe && (
                  <span className="text-xs bg-purple-500 px-2 py-1 rounded">
                    YOU
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span>{p.wins}W</span>
                <span>{p.losses}L</span>
                <span>{p.draws}D</span>
                <span className="font-bold text-white">
                  {p.points} pts
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🔥 YOUR RANK */}
      {myRank && (
        <div className="text-center mt-10 text-gray-300">
          Your current rank:{" "}
          <span className="text-purple-400 font-bold">
            #{myRank}
          </span>
        </div>
      )}
    </div>
  );
}
