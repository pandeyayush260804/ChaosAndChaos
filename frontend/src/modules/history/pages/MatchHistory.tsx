import { useEffect, useState } from "react";
import { fetchMyMatchHistory } from "../api/history-api";

type Match = {
  _id: string;
  roomID: string;
  playerEmail: string;
  opponentEmail: string;
  result: "win" | "lose" | "draw";
  score?: number;
  reason?: string;
  createdAt: string;
};

export default function MatchHistory() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMatchId, setOpenMatchId] = useState<string | null>(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      console.error("❌ No email in localStorage");
      setLoading(false);
      return;
    }

    fetchMyMatchHistory(email)
      .then((res) => {
        console.log("📜 Match history fetched:", res.data.history);
        setMatches(res.data.history);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch match history", err);
        setMatches([]);
      })
      .finally(() => setLoading(false));
  }, [email]);

  const toggleDetails = (id: string) => {
    setOpenMatchId((prev) => (prev === id ? null : id));
  };

  const getResultEmoji = (result: "win" | "lose" | "draw") => {
    if (result === "win") return "🏆";
    if (result === "lose") return "💀";
    return "🤝";
  };

  if (loading) {
    return <div className="p-8 text-gray-400">Loading match history...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2a2e] via-[#071c22] to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">HISTORY</h1>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-5 text-sm text-gray-400 px-4 mb-3">
          <div>OPPONENT</div>
          <div className="text-center">MATCH SCORE</div>
          <div className="text-center">RESULT</div>
          <div className="text-center">OUTCOME</div>
          <div></div>
        </div>

        {matches.length === 0 && (
          <p className="text-gray-400">No matches played yet.</p>
        )}

        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match._id}
              className="bg-gradient-to-r from-[#0b1f25] to-[#09161b] 
              border border-white/10 rounded-xl p-4 shadow-xl"
            >
              {/* MAIN ROW */}
              <div className="grid grid-cols-5 items-center">
                {/* OPPONENT */}
                <div>
                  <p className="font-semibold">{match.opponentEmail}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(match.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* SCORE */}
                <div className="text-center font-bold">
                  {match.result === "draw" ? "1 - 1" : match.result === "win" ? "1 - 0" : "0 - 1"}
                </div>

                {/* RESULT */}
                <div
                  className={`text-center font-bold ${
                    match.result === "win"
                      ? "text-green-400"
                      : match.result === "lose"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {match.result.toUpperCase()}
                </div>

                {/* EMOJI */}
                <div className="text-center text-2xl">
                  {getResultEmoji(match.result)}
                </div>

                {/* DROPDOWN */}
                <div className="text-right">
                  <button
                    onClick={() => toggleDetails(match._id)}
                    className="text-cyan-400 hover:text-cyan-300 transition"
                  >
                    {openMatchId === match._id ? "▲" : "▼"}
                  </button>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {openMatchId === match._id && (
                <div className="mt-4 ml-2 text-sm text-gray-300 space-y-2">
                  <p>
                    🕒 <span className="text-gray-400">Played:</span>{" "}
                    {new Date(match.createdAt).toLocaleString()}
                  </p>

                  {typeof match.score === "number" && (
                    <p>
                      📊 <span className="text-gray-400">Score:</span>{" "}
                      {match.score}%
                    </p>
                  )}

                  {match.reason && (
                    <p>
                      📌 <span className="text-gray-400">Reason:</span>{" "}
                      {match.reason.replaceAll("_", " ")}
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    Room ID: {match.roomID}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
