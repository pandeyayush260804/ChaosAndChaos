import express from "express";
import {
  getAllPlayers,
  searchPlayer,
} from "../../../controllers/adminPlayersController.js";

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/search", searchPlayer);

export default router;
