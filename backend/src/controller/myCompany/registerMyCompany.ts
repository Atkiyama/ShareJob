import { Request, Response } from 'express';
import { MyCompany, MyCompanyModel } from '../../model/companyInfo';
import connectDB from '../../utils/database';
/**
 * 会社のメモ情報を登録するAPI
 * @param req email,id,memoがbodyに格納される
 * @param res 
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const companyInfo: MyCompany = new MyCompanyModel({
            email: req.body.email,
            id: req.body.id,
            memo: req.body.memo,
        });
        await companyInfo.save();

        return res.status(200).json({ message: "企業情報登録成功" });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "エラーが発生しました"
            , err: err
        });
    }
};