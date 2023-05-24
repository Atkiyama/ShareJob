"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginUser_1 = __importDefault(require("../controller/user/LoginUser"));
const registerUser_1 = __importDefault(require("../controller/user/registerUser"));
const getCompanyInfoList_1 = __importDefault(require("../controller/companyInfo/getCompanyInfoList"));
const registerCompanyInfo_1 = __importDefault(require("../controller/companyInfo/registerCompanyInfo"));
const getCompanyList_1 = __importDefault(require("../controller/company/getCompanyList"));
const router = express_1.default.Router();
// カスタムミドルウェア関数
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
router.use(logRequest); // ミドルウェアの適用
router.post('/user/login', LoginUser_1.default);
router.post('/user/register', registerUser_1.default);
router.get('/companyInfo/getCompanyInfoList', getCompanyInfoList_1.default);
router.post('/companyInfo/registerCompanyInfo', registerCompanyInfo_1.default);
router.get('/company/getCompanyList', getCompanyList_1.default);
exports.default = router;
