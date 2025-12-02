import mongoose from "mongoose";
import { createMainConnection } from "../utils/db/connection.js";

const mainDB = createMainConnection();

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    status: { type: Number, default: 1 },
    regdate: { type: Date, default: Date.now }
}, { versionKey: false });

export const adminModel = mainDB.model("admins", adminSchema);
