import { Request, Response } from 'express';
import { MyCompany, MyCompanyModel } from '../../model/myCompany';
import connectDB from '../../utils/database';

/**
 * 会社のメモ情報を更新するAPI
 * @param req paramsにemailとid,bodyにmemoを格納
 * @param res メッセージを返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const existsTest: MyCompany | null = await MyCompanyModel.findOne({ email: req.params.email, id: req.params.id });

        if (existsTest) {
            await MyCompanyModel.updateOne(
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
