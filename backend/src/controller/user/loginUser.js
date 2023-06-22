"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const database_1 = __importDefault(require("../../utils/database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * ログイン時のAPI
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const savedUserData = yield user_1.UserModel.findOne({ email: req.body.email });
            const password = req.body.password;
            if (savedUserData) {
                const hashed = savedUserData.password;
                if (yield bcrypt_1.default.compare(password, hashed)) {
                    const token = jsonwebtoken_1.default.sign({ email: savedUserData.email }, process.env.SECRET_KEY, { expiresIn: 3600 });
                    console.log(token);
                    return res.status(200).json({ message: 'ログイン成功', name: savedUserData.name, token: token });
                }
                else {
                    return res.status(400).json({ message: 'ログイン失敗' });
                }
            }
            else {
                console.log("ユーザが存在しません");
                return res.status(400).json({ message: 'ログイン失敗' });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'ログイン失敗' });
        }
    });
}
exports.default = default_1;
