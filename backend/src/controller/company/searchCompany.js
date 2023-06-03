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
 * APIとその関連制作中
 * @param req
 * @param res
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            if (typeof req.query.words === 'string') {
                const companyList = [];
                let words = [];
                console.log(typeof req.query.words);
                words = req.query.words.split(" ");
                for (let i = 0; i < words.length; i++) {
                    if (words[i].split("　").length > 1) {
                        words.splice(i, 1, ...words[i].split("　"));
                    }
                }
                for (let i = 0; i < words.length; i++) {
                    const companies = yield company_1.CompanyModel.find({
                        $or: [
                            { name: { $regex: words[i], $options: 'i' } },
                            { abstract: { $regex: words[i], $options: 'i' } },
                            { industries: { $regex: words[i], $options: 'i' } },
                            { locations: { $regex: words[i], $options: 'i' } }
                        ]
                    });
                    companyList.push(...companies);
                }
                console.log(companyList);
                const uniqueCompanyList = Array.from(new Set(companyList.map((company) => company.id))).map((id) => companyList.find((company) => company.id === id));
                return res.status(200).json({ companyList: uniqueCompanyList });
            }
            else {
                return res.status(200).json({ companyList: [] });
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
