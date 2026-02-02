import express from "express";
import { getMyMatchHistory } from "../../../controllers/matchHistoryController.js";

const router = express.Router();

router.get("/my-history", getMyMatchHistory);

export default router;
