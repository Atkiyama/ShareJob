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
        const companyInfoList: CompanyInfo[] | null = await CompanyInfoModel.find({ email: req.query.email });


        return res.status(200).json({ CompanyInfoList: companyInfoList });
    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました"
            , err: err
        });
    }
};