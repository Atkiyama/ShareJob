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
const companyInfo_1 = require("../../model/companyInfo");
const database_1 = __importDefault(require("../../utils/database"));
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const existsTest = yield companyInfo_1.CompanyInfoModel.findOne({ email: req.params.email, id: req.params.id });
            if (existsTest) {
                yield companyInfo_1.CompanyInfoModel.updateOne({ email: req.params.email, id: req.params.id }, // 更新対象のクエリ
                { $set: { memo: req.body.memo } } // 更新内容
                );
                return res.status(200).json({ message: "更新に成功しました" });
            }
            else {
                return res.status(400).json({
                    message: "エラーが発生しました\nこのメモは存在しません"
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
