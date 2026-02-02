import { MatchHistoryModel } from "../models/MatchHistory.js";

export async function getAllMatchesAdmin() {
  const matches = await MatchHistoryModel.aggregate([
    {
      $group: {
        _id: "$roomID",
        players: { $addToSet: "$playerEmail" },
        results: { $push: "$result" },
        createdAt: { $first: "$createdAt" },
        reason: { $first: "$reason" },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return matches;
}
