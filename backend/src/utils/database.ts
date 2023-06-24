import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const db: string = process.env.MONGODB_LOCAL!;

// pass:45GvKUHZB6ILlhQJ
/**
 * データベースに接続する
 */
const connectDB = async (): Promise<void> => {
    try {

        await mongoose.connect(db);
        //console.log("Success: Connected to MongoDB");
    } catch (err) {
        console.log("Failure: Unconnected to MongoDB");
        console.log(err);
        throw new Error();
    }
};

export default connectDB;
