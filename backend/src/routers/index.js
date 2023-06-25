"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../utils/auth"));
const loginUser_1 = __importDefault(require("../controller/user/loginUser"));
const registerUser_1 = __importDefault(require("../controller/user/registerUser"));
const getMyCompanyList_1 = __importDefault(require("../controller/myCompany/getMyCompanyList"));
const registerMyCompany_1 = __importDefault(require("../controller/myCompany/registerMyCompany"));
const getCompanyList_1 = __importDefault(require("../controller/company/getCompanyList"));
const updateMyCompany_1 = __importDefault(require("../controller/myCompany/updateMyCompany"));
const deleteMyCompany_1 = __importDefault(require("../controller/myCompany/deleteMyCompany"));
const updateUser_1 = __importDefault(require("../controller/user/updateUser"));
const updateUserAll_1 = __importDefault(require("../controller/user/updateUserAll"));
const deleteUser_1 = __importDefault(require("../controller/user/deleteUser"));
const searchCompany_1 = __importDefault(require("../controller/company/searchCompany"));
const getRegisterCompanyList_1 = __importDefault(require("../controller/company/getRegisterCompanyList"));
const updateCompany_1 = __importDefault(require("../controller/company/updateCompany"));
const registerCompany_1 = __importDefault(require("../controller/company/registerCompany"));
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
    var _a;
    const requestTime = new Date().toISOString();
    const logMessage = `[${requestTime}] ${req.method} ${req.url}\n`;
    const logFilePath = path_1.default.join(__dirname, `../../../database/log/${getFormattedDate()}.log`); // 日付ごとのログファイルのパスを指定
    console.log(logMessage); // コンソールにログを表示
    // リクエストヘッダからトークンを取得
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || 'No token';
    const requestHeaderMessage = `Token: ${token}\n`;
    console.log(requestHeaderMessage);
    // リクエストボディをログに追加
    const requestBodyMessage = `Request Body: ${JSON.stringify(req.body)}\n`;
    console.log(requestBodyMessage);
    /*
    fs.appendFileSync(logFilePath, logMessage);
    fs.appendFileSync(logFilePath, requestHeaderMessage);
    fs.appendFileSync(logFilePath, requestBodyMessage);

    res.on('finish', () => {
        const responseMessage = `Response ${res.statusCode} ${res.statusMessage}\n`;

        console.log(responseMessage); // コンソールにレスポンスのログを表示

        // レスポンスの内容をログに追加
        const responseDataMessage = `Response Data: ${JSON.stringify(res.locals.data)}\n`;
        console.log(responseDataMessage);

        fs.appendFileSync(logFilePath, responseMessage);
        fs.appendFileSync(logFilePath, responseDataMessage);
    });
    */
    next();
};
router.use(logRequestAndResponse);
/**
 * ルーティング部分
 */
router.post('/user/login', loginUser_1.default);
router.post('/user/register', registerUser_1.default);
router.get('/myCompany/getMyCompanyList', auth_1.default, getMyCompanyList_1.default);
router.post('/myCompany/registerMyCompany', auth_1.default, registerMyCompany_1.default);
router.get('/company/getCompanyList', auth_1.default, getCompanyList_1.default);
router.put('/myCompany/updateMyCompany/:email/:id', auth_1.default, updateMyCompany_1.default);
router.delete('/myCompany/deleteMyCompany/:email/:id', auth_1.default, deleteMyCompany_1.default);
router.put('/user/update/:email', auth_1.default, updateUser_1.default);
router.put('/user/updateAll/:email', auth_1.default, updateUserAll_1.default);
router.delete('/user/delete/:email', auth_1.default, deleteUser_1.default);
router.get('/company/searchCompany', auth_1.default, searchCompany_1.default);
router.get('/company/getRegisterCompanyList', auth_1.default, getRegisterCompanyList_1.default);
router.put('/company/updateCompany/:id', auth_1.default, updateCompany_1.default);
router.post('/company/registerCompany', auth_1.default, registerCompany_1.default);
exports.default = router;
