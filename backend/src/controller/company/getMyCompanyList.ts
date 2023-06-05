import { Request, Response } from 'express';
import connectDB from '../../utils/database';
import { Company, CompanyModel } from '../../model/company';

/**
 * APIとその関連制作中
 * @param req 
 * @param res 
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        if (typeof req.query.email === 'string') {

            const email: string = req.query.email;
            const companyList: Company[] | null = await CompanyModel.find({ author: email });
            return res.status(200).json({ companyList: companyList });
        } else {
            return res.status(400).json({ message: "エラーが発生しました \n" + "データがありません" });
        }

    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました",
            err: err
        });
    }
};
