import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();

        const existsTest: User | null = await UserModel.findOne({ email: req.params.email });
        if (existsTest) {
            await UserModel.deleteOne({ email: req.params.email });
            return res.status(200).json({ message: '削除に成功しました' });
        } else {
            return res.status(400).json({ message: '削除失敗:ユーザーが存在しません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '削除失敗:\n' + err });
    }
}
