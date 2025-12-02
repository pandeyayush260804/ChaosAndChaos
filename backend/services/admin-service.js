import { adminModel } from "../models/admin-model.js";
import { encryptPassword } from "../utils/services/password-hash.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/services/token.js";

export const registerAdmin = async (adminObject) => {
    try {
        adminObject.password = encryptPassword(adminObject.password);

        const doc = await adminModel.create(adminObject);

        if (doc && doc._id) {
            return "User Register Succesfully";
        }

    } catch (err) {
        throw err;
    }
};

export const loginAdmin = async (adminObject) => {
    try {
        const doc = await adminModel.findOne({ email: adminObject.email }).exec();
        if (!doc) {
            throw new Error("Invalid username or password");
        }

        const isMatch = await bcrypt.compare(adminObject.password, doc.password);
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
