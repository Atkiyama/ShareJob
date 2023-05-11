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
const user_1 = require("../model/user");
const database_1 = __importDefault(require("../utils/database"));
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const savedUserData = yield user_1.UserModel.findOne({ password: req.body.password });
            if (savedUserData) {
                return res.status(200).json({ message: 'アイテム読み取り成功(オール)', savedUserData: savedUserData });
            }
            else {
                return res.status(400).json({ message: 'ログイン失敗:ユーザー登録をしてください' });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'ログイン失敗' });
        }
    });
}
exports.default = postUser;
