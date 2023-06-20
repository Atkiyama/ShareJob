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
const database_1 = __importDefault(require("../../utils/database"));
const company_1 = require("../../model/company");
/**
 * 検索した会社を返すAPI
 * @param req 検索ワードがwords:stringとして格納される
 * @param res ヒットした企業がcompanyListとして返される
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const existTest = yield company_1.CompanyModel.findOne({ id: req.params.id });
            if (typeof req.params.id === 'string' && existTest) {
                yield company_1.CompanyModel.updateOne({
                    id: req.params.id
                }, {
                    $set: {
                        name: req.body.name,
                        author: req.body.author,
                        abstract: req.body.abstract,
                        industries: req.body.industries,
                        locations: req.body.locations,
                    }
                });
                return res.status(200).json({ message: req.body.name + "を更新しました" });
            }
            else {
                return res.status(200).json({ message: 'リクエストが不正です' });
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
