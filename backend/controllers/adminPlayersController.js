import { getAdminPlayerStats } from "../services/adminPlayers-service.js";

export async function getAllPlayers(req, res) {
  try {
    const limit = Number(req.query.limit) || 100;
    const players = await getAdminPlayerStats(limit);
    res.json({ success: true, players });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

export async function searchPlayer(req, res) {
  try {
    const { email } = req.query;
    const players = await getAdminPlayerStats(1000);
    const player = players.find((p) => p.email === email);

    res.json({ success: true, player });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}
