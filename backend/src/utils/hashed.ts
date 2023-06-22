import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

/**
 * テストデータ生成用
 * originalのuser.jsonからパスワードをハッシュ化したuser.jsonを生成する
 */
dotenv.config();

// SALT_ROUNDSを.envファイルから読み込む
const saltRounds: number = parseInt(process.env.SALT_ROUNDS!);
console.log(process.env.SALT_ROUNDS!)
console.log(saltRounds)


// 入力ファイルパスと出力ファイルパス
const inputFilePath: string = '../database/original/user.json';
const outputFilePath: string = '../database/json/user.json';

// JSONファイルからデータを読み込む
const inputData: any[] = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// パスワードをハッシュ化する関数
const hashPassword = async (password: string): Promise<string> => {
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// パスワードをハッシュ化してデータを更新する
const hashPasswordsInData = async (data: any[]): Promise<any[]> => {
    for (let item of data) {
        item.password = await hashPassword(item.password);
    }
    return data;
};

// ハッシュ化されたデータを出力ファイルに書き込む
const writeOutputFile = (data: any[]): void => {
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
    console.log('Output file created:', outputFilePath);
};

// メイン処理
const main = async (): Promise<void> => {
    try {
        const hashedData: any[] = await hashPasswordsInData(inputData);
        writeOutputFile(hashedData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// メイン処理の実行
main();
