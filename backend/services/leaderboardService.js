import { MatchHistoryModel } from "../models/MatchHistory.js";

export async function getLeaderboard(top = 25) {
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
        draws: {
          $sum: { $cond: [{ $eq: ["$result", "draw"] }, 1, 0] },
        },
        matches: { $sum: 1 },
      },
    },
    {
      $addFields: {
        points: {
          $add: [
            { $multiply: ["$wins", 3] },
            { $multiply: ["$draws", 1] },
          ],
        },
      },
    },
    {
      $sort: { points: -1, wins: -1, matches: 1 },
    },
    {
      $limit: top,
    },
  ]);
}

export async function getPlayerRank(email) {
  const all = await MatchHistoryModel.aggregate([
    {
      $group: {
        _id: "$playerEmail",
        wins: { $sum: { $cond: [{ $eq: ["$result", "win"] }, 1, 0] } },
        draws: { $sum: { $cond: [{ $eq: ["$result", "draw"] }, 1, 0] } },
      },
    },
    {
      $addFields: {
        points: {
          $add: [
            { $multiply: ["$wins", 3] },
            { $multiply: ["$draws", 1] },
          ],
        },
      },
    },
    { $sort: { points: -1, wins: -1 } },
  ]);

  const index = all.findIndex((p) => p._id === email);
  return index === -1 ? null : index + 1;
}
