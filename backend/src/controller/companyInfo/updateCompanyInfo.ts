import { Request, Response } from 'express';
import { CompanyInfo, CompanyInfoModel } from '../../model/companyInfo';
import connectDB from '../../utils/database';

export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const existsTest: CompanyInfo | null = await CompanyInfoModel.findOne({ email: req.params.email, id: req.params.id });

        if (existsTest) {
            await CompanyInfoModel.updateOne(
                { email: req.params.email, id: req.params.id }, // 更新対象のクエリ
                { $set: { memo: req.body.memo } } // 更新内容
            );

            return res.status(200).json({ message: "更新に成功しました" });
        } else {
            return res.status(400).json({
                message: "エラーが発生しました\nこのメモは存在しません"
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました",
            err: err
        });
    }
};
