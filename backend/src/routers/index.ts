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

const router: Router = express.Router();

// カスタムミドルウェア関数
// API呼び出しの際にログを出力する
const logRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

router.use(logRequest); // ミドルウェアの適用

router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.get('/companyInfo/getCompanyInfoList', getCompanyInfoList);
router.post('/companyInfo/registerCompanyInfo', registerCompanyInfo);
router.get('/company/getCompanyList', getCompanyList);
router.put('/companyInfo/updateCompanyInfo/:email/:id', updateCompanyInfo);
router.delete('/companyInfo/deleteCompanyInfo/:email/:id', deleteCompanyInfo);
router.put('/user/update/:email', updateUser);

export default router;
