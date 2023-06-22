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
const myCompany_1 = require("../../model/myCompany");
const database_1 = __importDefault(require("../../utils/database"));
/**
 * 会社のメモの削除API
 * @param req emailとidが格納される
 * @param res メッセージを返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const existsTest = yield myCompany_1.MyCompanyModel.findOne({ email: req.params.email, id: req.params.id });
            if (existsTest) {
                yield myCompany_1.MyCompanyModel.deleteOne({ email: req.params.email, id: req.params.id });
                return res.status(200).json({ message: "消去に成功しました" });
            }
            else {
                return res.status(400).json({
                    message: "エラーが発生しました\n このメモは存在しません"
                });
            }
        }
        catch (err) {
            return res.status(400).json({
                message: "エラーが発生しました",
                err: err
            });
        }
    });
}
exports.default = default_1;
;
