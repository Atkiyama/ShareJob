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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * ユーザ情報登録のAPI
 * @param req bodyにemail,name,passwordを格納する
 * @param res メッセージを返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const exitsTest = yield user_1.UserModel.findOne({ email: req.body.email });
            if (!exitsTest) {
                const saltRounds = parseInt(process.env.SALT_ROUNDS);
                const salt = yield bcryptjs_1.default.genSalt(saltRounds);
                const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
                const user = new user_1.UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                });
                yield user.save();
                return res.status(200).json({ message: "ユーザー登録に成功しました" });
            }
            else {
                return res.status(200).json({ message: "ユーザー登録に失敗しました\n このemailのユーザはすでに存在しています" });
            }
        }
        catch (err) {
            return res.status(400).json({ message: "ユーザー登録に失敗しました\n" + err });
        }
    });
}
exports.default = default_1;
;
