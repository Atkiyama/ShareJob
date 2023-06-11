import mongoose from "mongoose";

// pass:45GvKUHZB6ILlhQJ
/**
 * データベースに接続する
 */
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/shareJob");
        //console.log("Success: Connected to MongoDB");
    } catch (err) {
        console.log("Failure: Unconnected to MongoDB");
        console.log(err);
        throw new Error();
    }
};

export default connectDB;
