import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const exitsTest: User | null = await UserModel.findOne({ email: req.body.email });
        if (!exitsTest) {
            const user: User = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                companyInfo: [],
            });

            await user.save();
            return res.status(200).json({ message: "ユーザー登録に成功しました成功" });
        } else {
            return res.status(200).json({ message: "ユーザー登録に失敗しました\n このemailのユーザはすでに存在しています" });
        }



    } catch (err) {
        return res.status(400).json({ message: "ユーザー登録に失敗しました\n" + err });
    }
};
