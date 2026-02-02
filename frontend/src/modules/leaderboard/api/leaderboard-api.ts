import axios from "axios";

const leaderboardAPI = axios.create({
  baseURL: import.meta.env.VITE_HISTORY_API_BASE_URL,
});

/* 🔥 GET TOP 25 PLAYERS */
export const fetchLeaderboard = () => {
  console.log("📊 Fetching leaderboard");
  return leaderboardAPI.get("/leaderboard");
};

/* 🔥 GET MY RANK */
export const fetchMyRank = (email: string) => {
  console.log("🏅 Fetching rank for:", email);
  return leaderboardAPI.get("/leaderboard/my-rank", {
    params: { email },
  });
};
