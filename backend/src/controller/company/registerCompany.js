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
Object.defineProperty(exports, "__esModule", { value: true });
const company_1 = require("../../model/company");
const crypto_1 = require("crypto");
/**
 * 自分で登録した会社のリストを入手するAPI
 * @param req ユーザのemail
 * @param res companyListを返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = (0, crypto_1.randomUUID)();
            let existTest = yield company_1.CompanyModel.findOne({
                id: id
            });
            //重複がなくなるまで続ける
            while (existTest) {
                id = (0, crypto_1.randomUUID)();
                let existTest = yield company_1.CompanyModel.findOne({
                    id: id
                });
            }
            const company = {
                id: id,
                name: req.body.name,
                author: req.body.author,
                abstract: req.body.abstract,
                industries: req.body.industries,
                locations: req.body.locations,
            };
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
