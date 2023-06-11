import { Request, Response } from 'express';
import { CompanyInfo, CompanyInfoModel } from '../../model/companyInfo';
import connectDB from '../../utils/database';

/**
 * 会社のメモの削除API
 * @param req emailとidが格納される
 * @param res メッセージを返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const existsTest: CompanyInfo | null = await CompanyInfoModel.findOne({ email: req.params.email, id: req.params.id });
        if (existsTest) {
            await CompanyInfoModel.deleteOne({ email: req.params.email, id: req.params.id });
            return res.status(200).json({ message: "消去に成功しました" });
        } else {
            return res.status(400).json({
                message: "エラーが発生しました\n このメモは存在しません"
            });
        }


    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました"
            , err: err
        });
    }
};