import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';
import dotenv from 'dotenv';

dotenv.config();

/**
 * リロード時のAPI
 * トークンがあればnameを返してくれる
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();

        const savedUserData: User | null = await UserModel.findOne({ email: req.body.email });

        if (savedUserData) {
            return res.status(200).json({ name: savedUserData.name });
        } else {
            console.log("ユーザが存在しません")
            return res.status(400).json({ message: 'ログイン失敗' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'ログイン失敗' });
    }
}
