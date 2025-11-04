// lib/mongodb.js
import mongoose from "mongoose";

let isConnect = false;

export const connectDb = async () => {

    if (isConnect) {
        console.log("MongnDb connect Successfully")
        return;
    }

    try {

        await mongoose.connect(
            process.env.MONGO_URI,
            {
                dbName: "LearnMongo_Db"
            }
        )

        isConnect = true
        console.log("MongoDB connected");

    } catch (error) {
        console.error("MongoDB connection error:", error);

    }
}

