import express from "express";
import adminRoutes from "./admin-routes.js";
import playerRoutes from "./player-routes.js";
import matchHistoryRoutes from "./matchHistoryRoutes.js";
import leaderboardRoutes from "./leaderboardRoutes.js";

export const indexRoute = express.Router();

indexRoute.use("/admin", adminRoutes);
indexRoute.use("/player", playerRoutes);
indexRoute.use("/match-history", matchHistoryRoutes);

/* 🔥 LEADERBOARD */
indexRoute.use("/leaderboard", leaderboardRoutes);
