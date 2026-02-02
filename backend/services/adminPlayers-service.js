import { MatchHistoryModel } from "../models/MatchHistory.js";

export async function getAdminPlayerStats(limit = 100) {
  return MatchHistoryModel.aggregate([
    {
      $group: {
        _id: "$playerEmail",
        wins: {
          $sum: { $cond: [{ $eq: ["$result", "win"] }, 1, 0] },
        },
        losses: {
          $sum: { $cond: [{ $eq: ["$result", "lose"] }, 1, 0] },
        },
        matches: { $sum: 1 },
      },
    },
    {
      $project: {
        email: "$_id",
        wins: 1,
        losses: 1,
        matches: 1,
        winRate: {
          $cond: [
            { $eq: ["$matches", 0] },
            0,
            {
              $round: [
                { $multiply: [{ $divide: ["$wins", "$matches"] }, 100] },
                2,
              ],
            },
          ],
        },
      },
    },
    { $sort: { wins: -1, matches: -1 } },
    { $limit: limit }, // 🔥 IMPORTANT
  ]);
}
