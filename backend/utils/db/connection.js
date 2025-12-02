import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const createMainConnection = () => {
    return mongoose.createConnection(process.env.DB_URL, {
        maxPoolSize: 10
    });
};

