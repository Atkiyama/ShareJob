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

        if (typeof req.query.words === 'string') {
            const companyList: Company[] = [];
            let words: string[] = [];
            console.log(typeof req.query.words);
            words = req.query.words.split(" ");
            for (let i = 0; i < words.length; i++) {
                if (words[i].split("　").length > 1) {
                    words.splice(i, 1, ...words[i].split("　"));
                }
            }
            for (let i = 0; i < words.length; i++) {
                const companies = await CompanyModel.find({
                    $or: [
                        { name: { $regex: words[i], $options: 'i' } },
                        { abstract: { $regex: words[i], $options: 'i' } },
                        { industries: { $regex: words[i], $options: 'i' } },
                        { locations: { $regex: words[i], $options: 'i' } }
                    ]
                });

                companyList.push(...companies);
            }
            console.log(companyList);
            const uniqueCompanyList = Array.from(new Set(companyList.map((company) => company.id))).map((id) =>
                companyList.find((company) => company.id === id)
            );

            return res.status(200).json({ companyList: uniqueCompanyList });
        } else {
            return res.status(200).json({ companyList: [] });
        }







    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました",
            err: err
        });
    }
};
