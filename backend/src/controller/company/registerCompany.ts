import { Request, Response } from 'express';
import connectDB from '../../utils/database';
import { Company, CompanyModel } from '../../model/company';
import { randomUUID } from 'crypto';

/**
 * 自分で登録した会社のリストを入手するAPI
 * @param req ユーザのemail
 * @param res companyListを返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        let id = randomUUID();
        let existTest: Company | null = await CompanyModel.findOne({
            id:
                id
        });

        //重複がなくなるまで続ける
        while (existTest) {
            id = randomUUID();
            let existTest: Company | null = await CompanyModel.findOne({
                id:
                    id
            });
        }
        await connectDB();
        const company: Company = new CompanyModel({
            id: id,
            name: req.body.name,
            author: req.body.author,
            abstract: req.body.abstract,
            industries: req.body.industries,
            locations: req.body.locations,
        })
        company.save();



    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました",
            err: err
        });
    }
};
