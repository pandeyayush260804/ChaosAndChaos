import { getLeaderboard } from "./leaderboardService.js";

export async function getAdminLeaderboard(limit = 50) {
  return getLeaderboard(limit);
}
