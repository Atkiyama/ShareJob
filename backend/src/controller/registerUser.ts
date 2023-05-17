import { Request, Response } from 'express';
import { UserModel, User } from '../model/user';
import connectDB from '../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const user: User = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            companyInfo: [],
        });
        await user.save();
        return res.status(200).json({ message: "ユーザー登録成功" });
    } catch (err) {
        return res.status(400).json({ message: "ユーザー登録失敗" });
    }
};
