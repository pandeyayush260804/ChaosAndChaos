import express from "express";
import { login, register } from "../../../controllers/admin-controller.js";

import adminMatches from "./admin-matches.js";
import adminPlayers from "./admin-players.js";
import adminLeaderboard from "./admin-leaderboard.js";

const router = express.Router();

/* ===============================
   🔐 ADMIN AUTH
=============================== */
router.post("/login", login);
router.post("/register", register);

/* ===============================
   📊 ADMIN FEATURES
=============================== */

// view all matches (1 room = 1 record)
router.use("/matches", adminMatches);

// view all players + search
router.use("/players", adminPlayers);

// global leaderboard (filter top N)
router.use("/leaderboard", adminLeaderboard);

export default router;
