import { playerModel } from "../models/player-model.js";
import { encryptPassword } from "../utils/services/password-hash.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/services/token.js";

export const registerPlayer = async (playerObject) => {
    try {
        playerObject.password = encryptPassword(playerObject.password);

        const doc = await playerModel.create(playerObject);

        if (doc && doc._id) {
            return "User Register Succesfully";
        }

    } catch (err) {
        throw err;
    }
};

export const loginPlayer = async (playerObject) => {
    try {
        const doc = await playerModel.findOne({ email: playerObject.email }).exec();
        if (!doc) {
            throw new Error("Invalid username or password");
        }

        const isMatch = await bcrypt.compare(playerObject.password, doc.password);
        if (!isMatch) {
            throw new Error("Invalid username or password");
        }

        const token = generateToken(doc.email);

        return {
            message: "Welcome " + doc.name,
            email: doc.email,
            role: doc.role,
            token: token
        };

    } catch (err) {
        throw new Error(err.message || "Invalid user credentials");
    }
};
