import { Request, Response } from 'express';
import connectDB from '../../utils/database';
import { Company, CompanyModel } from '../../model/company';

/**
 * 検索した会社を返すAPI
 * @param req 検索ワードがwords:stringとして格納される
 * @param res ヒットした企業がcompanyListとして返される
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const existTest: Company | null = await CompanyModel.findOne({ id: req.params.id });

        if (typeof req.params.id === 'string' && existTest) {
            await CompanyModel.updateOne({
                id: req.params.id
            }, {
                $set: {
                    name: req.body.name,
                    author: req.body.author,
                    abstract: req.body.abstract,
                    industries: req.body.industries,
                    locations: req.body.locations,
                }
            })

            return res.status(200).json({ message: req.body.name + "を更新しました" });
        } else {
            return res.status(200).json({ message: 'リクエストが不正です' });
        }

    } catch (err) {
        return res.status(400).json({
            message: "エラーが発生しました",
            err: err
        });
    }
};
