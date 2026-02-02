import { getMatchHistoryByEmail } from "../services/match-history-service.js";

export async function getMyMatchHistory(req, res) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const history = await getMatchHistoryByEmail(email);

    res.json({
      success: true,
      history,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch match history",
    });
  }
}
