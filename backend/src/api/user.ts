const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const jwt = require("jsonwebtoken");
//const auth = require("./utils/auth");
const connectDB = require("../utils/database");
//const { ItemModel, UserModel } = require("../utils/schemaModels");

/*
getとpostのサンプル
app.post("/item/create", auth, async (req, res) => {
    try {
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({ message: "アイテム作成成功" });
    } catch (err) {
        return res.status(400).json({ message: "アイテム作成失敗" });
    }
});
//Read All Items

app.get("/", async (req, res) => {
    try {
        await connectDB();
        const allItems = await ItemModel.find();
        return res
            .status(200)
            .json({ message: "アイテム読み取り成功(オール)", allItems: allItems });
    } catch (err) {
        return res.status(400).json({ message: "アイテム読み取り失敗(オール)" });
    }
});
*/

app.post("/user/login", async (req: express.Request, res: express.Response) => {
    try {
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({ message: "アイテム作成成功" });
    } catch (err) {
        return res.status(400).json({ message: "アイテム作成失敗" });
    }
});