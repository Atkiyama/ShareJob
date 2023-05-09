const mongoose = require("mongoose");
//pass:45GvKUHZB6ILlhQJ
const connectDB = async () => {

    try {
        await mongoose.connect(
            "mongodb://127.0.0.1/shareJob"
        );
        console.log("Success: Connected to MongoDB");
    } catch (err) {
        console.log("Failure: Unconnected to MongoDB");
        console.log(err);
        throw new Error();
    }

};

module.exports = connectDB;
