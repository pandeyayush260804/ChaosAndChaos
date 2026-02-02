import mongoose from "mongoose";
import { createMainConnection } from "../utils/db/connection.js";

const mainDB = createMainConnection();

const matchHistorySchema = new mongoose.Schema(
  {
    roomID: { type: String, required: true },
    playerEmail: { type: String, required: true },
    opponentEmail: { type: String, required: true },
    result: {
      type: String,
      enum: ["win", "lose", "draw"],
      required: true,
    },
    score: { type: Number },
    reason: {
      type: String,
      enum: [
        "submission_successful",
        "submission_successful_by_opponent",
        "opponent_quit",
        "quit",
        "draw",
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

export const MatchHistoryModel = mainDB.model(
  "matchhistories",
  matchHistorySchema
);
