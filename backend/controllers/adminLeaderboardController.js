import { getAdminLeaderboard } from "../services/adminLeaderboard-service.js";

export async function adminLeaderboard(req, res) {
  const limit = Number(req.query.limit || 50);
  const data = await getAdminLeaderboard(limit);
  res.json({ success: true, leaderboard: data });
}
