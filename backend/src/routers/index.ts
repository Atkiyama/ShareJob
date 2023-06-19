import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import loginUser from '../controller/user/loginUser';
import registerUser from '../controller/user/registerUser';
import getMyCompanyList from '../controller/myCompany/getMyCompanyList';
import registerMyCompany from '../controller/myCompany/registerMyCompany';
import getCompanyList from '../controller/company/getCompanyList';
import updateMyCompany from '../controller/myCompany/updateMyCompany';
import deleteMyCompany from '../controller/myCompany/deleteMyCompany';
import updateUser from '../controller/user/updateUser';
import updateUserAll from '../controller/user/updateUserAll';
import deleteUser from '../controller/user/deleteUser';
import searchCompany from '../controller/company/searchCompany';
import getRegisterCompanyList from '../controller/company/getRegisterCompanyList';

/**
 * APIのルーティングとログ出力を定義する
 */
const router: Router = express.Router();

/**
 * 
 * @returns 日付けのフォーマット関数
 */
const getFormattedDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * APIリクエストのログを出力する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 
 */
const logRequestAndResponse = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const requestTime = new Date().toISOString();
    const logMessage = `[${requestTime}] ${req.method} ${req.url}\n`;
    const logFilePath = path.join(__dirname, `../../../database/log/${getFormattedDate()}.log`); // 日付ごとのログファイルのパスを指定

    console.log(logMessage); // コンソールにログを表示

    // リクエストボディをログに追加
    const requestBodyMessage = `Request Body: ${JSON.stringify(req.body)}\n`;
    console.log(requestBodyMessage);

    fs.appendFileSync(logFilePath, logMessage);
    fs.appendFileSync(logFilePath, requestBodyMessage);

    res.on('finish', () => {
        const responseMessage = `Response ${res.statusCode} ${res.statusMessage}\n`;
        const responseBodyMessage = `Response Body: ${JSON.stringify(res.locals.data)}\n`;

        console.log(responseMessage); // コンソールにレスポンスのログを表示
        console.log(responseBodyMessage); // コンソールにレスポンスボディのログを表示

        fs.appendFileSync(logFilePath, responseMessage);
        fs.appendFileSync(logFilePath, responseBodyMessage);
    });

    next();
};


router.use(logRequestAndResponse);

/**
 * ルーティング部分
 */
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.get('/myCompany/getMyCompanyList', getMyCompanyList);
router.post('/myCompany/registerMyCompany', registerMyCompany);
router.get('/company/getCompanyList', getCompanyList);
router.put('/myCompany/updateMyCompany/:email/:id', updateMyCompany);
router.delete('/myCompany/deleteMyCompany/:email/:id', deleteMyCompany);
router.put('/user/update/:email', updateUser);
router.put('/user/updateAll/:email', updateUserAll);
router.delete('/user/delete/:email', deleteUser);
router.get('/company/searchCompany', searchCompany);
router.get('/company/getRegisterCompanyList', getRegisterCompanyList);

export default router;
