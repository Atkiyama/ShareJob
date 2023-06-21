"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
/**
 * テストデータ生成用
 * originalのuser.jsonからパスワードをハッシュ化したuser.jsonを生成する
 */
dotenv.config();
// SALT_ROUNDSを.envファイルから読み込む
const saltRounds = parseInt(process.env.SALT_ROUNDS);
console.log(process.env.SALT_ROUNDS);
console.log(saltRounds);
// 入力ファイルパスと出力ファイルパス
const inputFilePath = '../database/original/user.json';
const outputFilePath = '../database/json/user.json';
// JSONファイルからデータを読み込む
const inputData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
// パスワードをハッシュ化する関数
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(saltRounds);
    const hashedPassword = yield bcrypt.hash(password, salt);
    return hashedPassword;
});
// パスワードをハッシュ化してデータを更新する
const hashPasswordsInData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    for (let item of data) {
        item.password = yield hashPassword(item.password);
    }
    return data;
});
// ハッシュ化されたデータを出力ファイルに書き込む
const writeOutputFile = (data) => {
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
    console.log('Output file created:', outputFilePath);
};
// メイン処理
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedData = yield hashPasswordsInData(inputData);
        writeOutputFile(hashedData);
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
});
// メイン処理の実行
main();
