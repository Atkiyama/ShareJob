import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 * ログイン時のAPI
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();

        const savedUserData: User | null = await UserModel.findOne({ email: req.body.email });
        const password: string = req.body.password;
        const hashed = savedUserData!.password;

        if (savedUserData && await bcrypt.compare(password, hashed)) {
            const token = jwt.sign({ email: savedUserData.email }, process.env.SECRET_KEY!, { expiresIn: 3600 });
            return res.status(200).json({ message: 'ログイン成功', name: savedUserData.name, token: token });
        } else {
            return res.status(400).json({ message: 'ログイン失敗' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'ログイン失敗' });
    }
}
