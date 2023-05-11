import { Request, Response } from 'express';
import { UserModel, User } from '../model/user';
import connectDB from '../utils/database';

export default async function postUser(req: Request, res: Response) {
    try {
        await connectDB();

        const savedUserData: User | null = await UserModel.findOne({ password: req.body.password });
        if (savedUserData) {
            return res.status(200).json({ message: 'アイテム読み取り成功(オール)', savedUserData: savedUserData });
        } else {
            return res.status(400).json({ message: 'ログイン失敗:ユーザー登録をしてください' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'ログイン失敗' });
    }
}
