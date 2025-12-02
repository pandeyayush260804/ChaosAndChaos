import mongoose from "mongoose";
import { createMainConnection } from "../utils/db/connection.js";

const mainDB = createMainConnection();

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "player" },
    status: { type: Number, default: 1 },
    regdate: { type: Date, default: Date.now }
}, { versionKey: false });

export const playerModel = mainDB.model("players", playerSchema);
