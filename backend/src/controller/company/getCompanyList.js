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
 * 会社の情報をリストで入手するAPI
 * @param req idが,区切りでidsに格納される
 * @param res companyListを返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const companyList = [];
            if (typeof req.query.ids === 'string') {
                const ids = req.query.ids;
                const decodedIds = decodeURIComponent(ids);
                console.log(decodedIds);
                const idArray = decodedIds.split(",");
                for (let i = 0; i < idArray.length; i++) {
                    const company = yield company_1.CompanyModel.findOne({ id: idArray[i] });
                    if (company) {
                        companyList.push(company);
                    }
                }
            }
            return res.status(200).json({ companyList: companyList });
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
