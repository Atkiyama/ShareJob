import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
/**
 * ユーザの更新用のAPI
 * @param req paramsにemail,bodyにemailとcompanyInfoListを格納
 * @param res メッセージを返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        //ユーザが存在するかのチェック
        const existsTest: User | null = await UserModel.findOne({ email: req.params.email });
        const saltRounds: number = parseInt(process.env.SALT_ROUNDS!);
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        if (existsTest) {
            await UserModel.updateOne({
                name: req.body.name,
                email: req.params.email,
            },
                {
                    $set: {
                        password: hashedPassword,
                    }
                });
            const test: User | null = await UserModel.findOne({ email: req.params.email });
            return res.status(200).json({ message: '更新に成功しました' });
        } else {
            return res.status(400).json({ message: '更新失敗:ユーザーが存在しません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '更新失敗:\n' + err });
    }
}
