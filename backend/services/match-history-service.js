import { MatchHistoryModel } from "../models/MatchHistory.js";

export async function saveMatchHistory(data) {
  try {
    const match = await MatchHistoryModel.create(data);
    console.log("✅ MATCH HISTORY SAVED:", match._id);
    return match;
  } catch (err) {
    console.error("❌ Match history save failed:", err.message);
    return null;
  }
}

export async function getMatchHistoryByEmail(email) {
  return MatchHistoryModel.find({
    playerEmail: email, // 🔥 ONLY my perspective
  })
    .sort({ createdAt: -1 })
    .limit(50);
}