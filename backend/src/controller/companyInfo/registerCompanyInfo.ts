import { Request, Response } from 'express';
import { CompanyInfo, CompanyInfoModel } from '../../model/companyInfo';
import connectDB from '../../utils/database';
/**
 * APIとその関連制作中
 * @param req 
 * @param res 
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const companyInfo: CompanyInfo = new CompanyInfoModel({
            email: req.body.email,
            id: req.body.id,
            memo: req.body.memo,
        });
        await companyInfo.save();

        return res.status(200).json({ message: "企業情報登録成功" });
    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました"
            , err: err
        });
    }
};