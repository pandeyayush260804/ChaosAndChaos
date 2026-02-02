import { getLeaderboard, getPlayerRank } from "../services/leaderboardService.js";

export async function leaderboard(req, res) {
  try {
    const topPlayers = await getLeaderboard(25);
    res.json({ success: true, leaderboard: topPlayers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Leaderboard failed" });
  }
}

export async function myRank(req, res) {
  try {
    const { email } = req.query;
    const rank = await getPlayerRank(email);
    res.json({ success: true, rank });
  } catch (err) {
    res.status(500).json({ success: false, message: "Rank fetch failed" });
  }
}
