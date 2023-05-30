import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();

        const existsTest: User | null = await UserModel.findOne({ email: req.params.email });
        if (existsTest) {
            await UserModel.updateOne({
                name: req.body.name,
                email: req.params.email,
                password: existsTest.password,
                companyInfo: req.body.companyInfo.split(","),
            });
            return res.status(200).json({ message: '更新に成功しました' });
        } else {
            return res.status(400).json({ message: '更新失敗:ユーザーが存在しません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '更新失敗:\n' + err });
    }
}
