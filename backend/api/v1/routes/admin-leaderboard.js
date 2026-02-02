import express from "express";
import { adminLeaderboard } from "../../../controllers/adminLeaderboardController.js";

const router = express.Router();

// ?limit=10 / 25 / 50
router.get("/", adminLeaderboard);

export default router;
