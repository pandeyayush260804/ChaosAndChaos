import express from "express";
import { leaderboard, myRank } from "../../../controllers/leaderboardController.js";

const router = express.Router();

router.get("/", leaderboard);
router.get("/my-rank", myRank);

export default router;
