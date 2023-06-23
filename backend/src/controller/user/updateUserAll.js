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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * ユーザ情報更新のAPI
 * データの主キーとなっているemailも更新したい場合はこちらを呼び出す
 * @param req paramsに更新前のemail,bodyに更新後のemail,name,passwordを格納される
 * @param res メッセージを返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            //存在チェック
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            const oldUser = yield user_1.UserModel.findOne({ email: req.params.email });
            if (oldUser) {
                const user = new user_1.UserModel({
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword
                });
                yield user_1.UserModel.deleteOne({
                    email: req.params.email,
                });
                yield user.save();
                return res.status(200).json({ message: '更新に成功しました' });
            }
            else {
                return res.status(400).json({ message: '更新に失敗しました' });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: '更新に失敗しました:\n' + err });
        }
    });
}
exports.default = default_1;
