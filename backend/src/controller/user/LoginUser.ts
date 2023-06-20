import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
        const saltRounds: number = parseInt(process.env.SALT_ROUNDS!);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log(saltRounds);
        console.log(hashedPassword);
        console.log(savedUserData!.password);
        if (savedUserData && await bcrypt.compare(hashedPassword, savedUserData.password)) {
            const token = jwt.sign(savedUserData.email, process.env.SECRET_KEY!, { expiresIn: "23h" });
            return res.status(200).json({ message: 'ログイン成功', savedUserData: savedUserData, token: token });
        } else {
            return res.status(400).json({ message: 'ログイン失敗' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'ログイン失敗' });
    }
}
