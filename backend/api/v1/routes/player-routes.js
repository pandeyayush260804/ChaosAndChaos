import express from "express";
import { login, register } from "../../../controllers/player-controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;
