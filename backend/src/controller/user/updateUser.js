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
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const existsTest = yield user_1.UserModel.findOne({ email: req.params.email });
            if (existsTest) {
                yield user_1.UserModel.updateOne({
                    name: req.body.name,
                    email: req.params.email,
                }, {
                    $set: {
                        password: existsTest.password,
                        companyInfoList: req.body.companyInfoList,
                    }
                });
                const test = yield user_1.UserModel.findOne({ email: req.params.email });
                return res.status(200).json({ message: '更新に成功しました', test: test });
            }
            else {
                return res.status(400).json({ message: '更新失敗:ユーザーが存在しません' });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: '更新失敗:\n' + err });
        }
    });
}
exports.default = default_1;