import express from "express";
import { getAllMatches } from "../../../controllers/adminMatchesController.js";

const router = express.Router();
router.get("/", getAllMatches);

export default router;
