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

        const companyList: Company[] = [];

        if (typeof req.query.ids === 'string') {

            const ids: string = req.query.ids;
            const decodedIds = decodeURIComponent(ids);
            const idArray: string[] = decodedIds.split(",");
            for (let i = 0; i < idArray.length; i++) {
                const company: Company | null = await CompanyModel.findOne({ id: idArray[i] });
                if (company) {
                    companyList.push(company);
                }
            }

        }

        return res.status(200).json({ companyList: companyList });
    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました",
            err: err
        });
    }
};
