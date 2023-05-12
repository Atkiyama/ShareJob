import express, { Application, Request, Response } from "express";
import cors from "cors";
import { urlencoded, json } from "body-parser";
import jwt from "jsonwebtoken";
import { ItemModel, UserModel } from "./utils/schemaModels";
import auth from "./utils/auth";
import connectDB from "./utils/database";

const app: Application = express();
const secret_key: string = "mern-market";

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// ITEM functions
// Create Item
app.post("/item/create", auth, async (req: Request, res: Response) => {
    try {
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({ message: "アイテム作成成功" });
    } catch (err) {
        return res.status(400).json({ message: "アイテム作成失敗" });
    }
});

// Read All Items
app.get("/", async (req: Request, res: Response) => {
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

// Read Single Item
app.get("/item/:id", async (req: Request, res: Response) => {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        return res.status(200).json({
            message: "アイテム読み取り成功(シングル)",
            singleItem: singleItem,
        });
    } catch (err) {
        return res.status(400).json({ message: "アイテム読み取り失敗(シングル)" });
    }
});

// Update Item
app.put("/item/update/:id", auth, async (req: Request, res: Response) => {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        if (singleItem.email === req.body.email) {
            await ItemModel.updateOne({ _id: req.params.id }, req.body);
            return res.status(200).json({ message: "アイテム編集成功" });
        } else {
            throw new Error();
        }
    } catch (err) {
        return res.status(400).json({ message: "アイテム編集失敗" });
    }
});

// Delete Item
app.delete("/item/delete/:id", auth, async (req: Request, res: Response) => {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.params.id);
        if (singleItem.email === req.body.email) {
            await ItemModel.deleteOne({ _id: req.params.id });
            return res.status(200).json({ message: "アイテム削除成功" });
        } else {
            throw new Error();
        }
    } catch (err) {
        return res.status(400).json({ message: "アイテム削除失敗" });
    }
});

//USER functions
//Register User
app.post("/user/register", async (req: Request, res: Response) => {
    try {
        await connectDB();
        await UserModel.create(req.body);
        return res.status(200).json({ message: "ユーザー登録成功" });
    } catch (err) {
        return res.status(400).json({ message: "ユーザー登録失敗" });
    }
});

//Login User
app.post("/user/login", async (req: Request, res: Response) => {
    try {
        await connectDB();
        const savedUserData = await UserModel.findOne({ email: req.body.email });
        if (savedUserData) {
            if (req.body.password === savedUserData.password) {
                const payload = {
                    email: req.body.email,
                };
                const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
                console.log(token);
                return res.status(200).json({ message: "ログイン成功", token: token });
            } else {
                return res
                    .status(400)
                    .json({ message: "ログイン失敗:パスワードが間違っています" });
            }
        } else {
            return res
                .status(400)
                .json({ message: "ログイン失敗:ユーザー登録をしてください" });
        }
    } catch (err) {
        return res.status(400).json({ message: "ログイン失敗" });
    }
});

const port: number = parseInt(process.env.PORT || "5000");

app.listen(port, () => {
    console.log(`Listening on localhost port ${port}`);
});
