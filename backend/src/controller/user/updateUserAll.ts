import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();

        const oldUser: User | null = await UserModel.findOne({ email: req.params.email });
        if (oldUser) {
            const user: User = new UserModel({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                companyInfoList: oldUser.companyInfoList
            });

            await UserModel.deleteOne({
                email: req.params.email,
            });


            await user.save();
            return res.status(200).json({ message: '更新に成功しました' });
        } else {
            return res.status(400).json({ message: '更新失敗:ユーザーが存在しません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '更新失敗:\n' + err });
    }
}
