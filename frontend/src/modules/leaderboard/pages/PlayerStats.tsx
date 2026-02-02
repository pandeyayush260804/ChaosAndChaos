import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMyMatchHistory } from "../../history/api/history-api";
import { fetchLeaderboard, fetchMyRank } from "../api/leaderboard-api";
import { getRank } from "../utils/rank.ts";

/* ======================
   TYPES (SAME FILE)
====================== */

type MatchResult = "win" | "lose" | "draw";

interface Match {
  _id: string;
  roomID: string;
  playerEmail: string;
  opponentEmail: string;
  result: MatchResult;
  score?: number;
  reason?: string;
  createdAt: string;
}

interface RankInfo {
  name: string;
  color: string;
}

interface PlayerStatsData {
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  points: number;
  rank: RankInfo;
  globalRank: number | null;
  recent: Match[];
}

/* ======================
   COMPONENT
====================== */

export default function PlayerStats() {
  const email = localStorage.getItem("email");

  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<PlayerStatsData | null>(null);

  useEffect(() => {
    if (!email) return;

    Promise.all([
      fetchMyMatchHistory(email),
      fetchLeaderboard(),
      fetchMyRank(email),
    ])
      .then(([historyRes, leaderboardRes, rankRes]) => {
        const history: Match[] = historyRes.data.history;

        const wins = history.filter(m => m.result === "win").length;
        const losses = history.filter(m => m.result === "lose").length;
        const draws = history.filter(m => m.result === "draw").length;

        const leaderboard = leaderboardRes.data.leaderboard;
        const me = leaderboard.find((p: any) => p._id === email);

        const points = me?.points ?? 0;
        const rankInfo = getRank(points);

        setStats({
          matches: history.length,
          wins,
          losses,
          draws,
          winRate: history.length
            ? Math.round((wins / history.length) * 100)
            : 0,
          points,
          rank: rankInfo,
          globalRank: rankRes.data.rank ?? null,
          recent: history.slice(0, 5),
        });
      })
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) {
    return <div className="p-10 text-gray-400">Loading stats...</div>;
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-xl"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Stats</h1>
            <p className="text-gray-400">{email}</p>
          </div>

          <div className="text-right">
            <p className={`text-xl font-bold ${stats.rank.color}`}>
              {stats.rank.name}
            </p>
            <p className="text-gray-400">Rank #{stats.globalRank}</p>
            <p className="text-purple-300 font-semibold">
              {stats.points} pts
            </p>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <StatCard label="Matches" value={stats.matches} />
          <StatCard label="Wins" value={stats.wins} color="text-green-400" />
          <StatCard label="Losses" value={stats.losses} color="text-red-400" />
          <StatCard label="Draws" value={stats.draws} color="text-yellow-400" />
          <StatCard label="Win %" value={`${stats.winRate}%`} />
        </div>

        {/* RECENT MATCHES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Battles</h2>
          <div className="space-y-3">
            {stats.recent.map((m) => (
              <div
                key={m._id}
                className="bg-black/40 border border-white/10 rounded-lg p-4 flex justify-between"
              >
                <div>
                  <p className="font-semibold">vs {m.opponentEmail}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>

                <p
                  className={`font-bold ${
                    m.result === "win"
                      ? "text-green-400"
                      : m.result === "lose"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {m.result.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ======================
   SMALL COMPONENT
====================== */

const StatCard = ({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: number | string;
  color?: string;
}) => (
  <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);
