import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 * ユーザ情報更新のAPI
 * データの主キーとなっているemailも更新したい場合はこちらを呼び出す
 * @param req paramsに更新前のemail,bodyに更新後のemail,name,passwordを格納される
 * @param res メッセージを返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        //存在チェック

        const saltRounds: number = parseInt(process.env.SALT_ROUNDS!);
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const oldUser: User | null = await UserModel.findOne({ email: req.params.email });
        if (oldUser) {
            const user: User = new UserModel({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword
            });

            await UserModel.deleteOne({
                email: req.params.email,
            });


            await user.save();
            return res.status(200).json({ message: '更新に成功しました' });
        } else {
            return res.status(400).json({ message: '更新に失敗しました' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '更新に失敗しました:\n' + err });
    }
}
