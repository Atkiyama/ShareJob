"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const loginUser_1 = __importDefault(require("../controller/user/loginUser"));
const registerUser_1 = __importDefault(require("../controller/user/registerUser"));
const getCompanyInfoList_1 = __importDefault(require("../controller/companyInfo/getCompanyInfoList"));
const registerCompanyInfo_1 = __importDefault(require("../controller/companyInfo/registerCompanyInfo"));
const getCompanyList_1 = __importDefault(require("../controller/company/getCompanyList"));
const updateCompanyInfo_1 = __importDefault(require("../controller/companyInfo/updateCompanyInfo"));
const deleteCompanyInfo_1 = __importDefault(require("../controller/companyInfo/deleteCompanyInfo"));
const updateUser_1 = __importDefault(require("../controller/user/updateUser"));
const updateUserAll_1 = __importDefault(require("../controller/user/updateUserAll"));
const deleteUser_1 = __importDefault(require("../controller/user/deleteUser"));
const searchCompany_1 = __importDefault(require("../controller/company/searchCompany"));
const getMyCompanyList_1 = __importDefault(require("../controller/company/getMyCompanyList"));
/**
 * APIのルーティングとログ出力を定義する
 */
const router = express_1.default.Router();
/**
 *
 * @returns 日付けのフォーマット関数
 */
const getFormattedDate = () => {
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
const logRequestAndResponse = (req, res, next) => {
    const requestTime = new Date().toISOString();
    const logMessage = `[${requestTime}] ${req.method} ${req.url}\n`;
    const logFilePath = path_1.default.join(__dirname, `../../../database/log/${getFormattedDate()}.log`); // 日付ごとのログファイルのパスを指定
    console.log(logMessage); // コンソールにログを表示
    // リクエストボディをログに追加
    const requestBodyMessage = `Request Body: ${JSON.stringify(req.body)}\n`;
    console.log(requestBodyMessage);
    fs_1.default.appendFileSync(logFilePath, logMessage);
    fs_1.default.appendFileSync(logFilePath, requestBodyMessage);
    res.on('finish', () => {
        const responseMessage = `Response ${res.statusCode} ${res.statusMessage}\n`;
        const responseBodyMessage = `Response Body: ${JSON.stringify(res.locals.data)}\n`;
        console.log(responseMessage); // コンソールにレスポンスのログを表示
        console.log(responseBodyMessage); // コンソールにレスポンスボディのログを表示
        fs_1.default.appendFileSync(logFilePath, responseMessage);
        fs_1.default.appendFileSync(logFilePath, responseBodyMessage);
    });
    next();
};
router.use(logRequestAndResponse);
/**
 * ルーティング部分
 */
router.post('/user/login', loginUser_1.default);
router.post('/user/register', registerUser_1.default);
router.get('/companyInfo/getCompanyInfoList', getCompanyInfoList_1.default);
router.post('/companyInfo/registerCompanyInfo', registerCompanyInfo_1.default);
router.get('/company/getCompanyList', getCompanyList_1.default);
router.put('/companyInfo/updateCompanyInfo/:email/:id', updateCompanyInfo_1.default);
router.delete('/companyInfo/deleteCompanyInfo/:email/:id', deleteCompanyInfo_1.default);
router.put('/user/update/:email', updateUser_1.default);
router.put('/user/updateAll/:email', updateUserAll_1.default);
router.delete('/user/delete/:email', deleteUser_1.default);
router.get('/company/searchCompany', searchCompany_1.default);
router.get('/company/getMyCompanyList', getMyCompanyList_1.default);
exports.default = router;
