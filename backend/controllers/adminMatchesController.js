import { getAllMatchesAdmin } from "../services/adminMatches-service.js";

export async function getAllMatches(req, res) {
  try {
    const matches = await getAllMatchesAdmin();
    res.json({ success: true, matches });
  } catch {
    res.status(500).json({ success: false });
  }
}
