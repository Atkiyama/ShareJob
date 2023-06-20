import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';
import bcrypt from 'bcryptjs';

/**
 * ユーザ情報登録のAPI
 * @param req bodyにemail,name,passwordを格納する
 * @param res メッセージを返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const exitsTest: User | null = await UserModel.findOne({ email: req.body.email });
        if (!exitsTest) {
            process.env.SECRET_KEY!;
            const hashedPassword = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS!);
            const user: User = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            await user.save();
            return res.status(200).json({ message: "ユーザー登録に成功しました" });
        } else {
            return res.status(200).json({ message: "ユーザー登録に失敗しました\n このemailのユーザはすでに存在しています" });
        }



    } catch (err) {
        return res.status(400).json({ message: "ユーザー登録に失敗しました\n" + err });
    }
};
