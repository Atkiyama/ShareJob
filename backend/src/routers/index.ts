import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import loginUser from '../controller/user/loginUser';
import registerUser from '../controller/user/registerUser';
import getCompanyInfoList from '../controller/companyInfo/getCompanyInfoList';
import registerCompanyInfo from '../controller/companyInfo/registerCompanyInfo';
import getCompanyList from '../controller/company/getCompanyList';
import updateCompanyInfo from '../controller/companyInfo/updateCompanyInfo';
import deleteCompanyInfo from '../controller/companyInfo/deleteCompanyInfo';
import updateUser from '../controller/user/updateUser';
import updateUserAll from '../controller/user/updateUserAll';
import deleteUser from '../controller/user/deleteUser';
import searchCompany from '../controller/company/searchCompany';

const router: Router = express.Router();

const getFormattedDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const logRequestAndResponse = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const requestTime = new Date().toISOString();
    const logMessage = `[${requestTime}] ${req.method} ${req.url}\n`;
    const logFilePath = path.join(__dirname, `../../../database/log/${getFormattedDate()}.log`); // 日付ごとのログファイルのパスを指定

    console.log(logMessage); // コンソールにログを表示


    fs.appendFileSync(logFilePath, logMessage);

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

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.get('/companyInfo/getCompanyInfoList', getCompanyInfoList);
router.post('/companyInfo/registerCompanyInfo', registerCompanyInfo);
router.get('/company/getCompanyList', getCompanyList);
router.put('/companyInfo/updateCompanyInfo/:email/:id', updateCompanyInfo);
router.delete('/companyInfo/deleteCompanyInfo/:email/:id', deleteCompanyInfo);
router.put('/user/update/:email', updateUser);
router.put('/user/updateAll/:email', updateUserAll);
router.delete('/user/delete/:email', deleteUser);
router.get('/company/searchCompany', searchCompany);

export default router;
