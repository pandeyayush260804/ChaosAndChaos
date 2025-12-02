import express from "express";
import adminRoutes from "./admin-routes.js";
import playerRoutes from "./player-routes.js";

export const indexRoute = express.Router();

indexRoute.use("/admin", adminRoutes);
indexRoute.use("/player", playerRoutes);
