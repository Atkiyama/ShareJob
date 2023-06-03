import { Request, Response } from 'express';
import { UserModel, User } from '../../model/user';
import connectDB from '../../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();

        const existsTest: User | null = await UserModel.findOne({ email: req.params.email });
        console.log(req.body.name);
        console.log(req.params.email);
        console.log(req.body.companyInfoList);
        if (existsTest) {
            await UserModel.updateOne({
                name: req.body.name,
                email: req.params.email,
            },
                {
                    $set: {
                        password: existsTest.password,
                        companyInfoList: req.body.companyInfoList,
                    }
                });
            const test: User | null = await UserModel.findOne({ email: req.params.email });
            return res.status(200).json({ message: '更新に成功しました', test: test });
        } else {
            return res.status(400).json({ message: '更新失敗:ユーザーが存在しません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '更新失敗:\n' + err });
    }
}
