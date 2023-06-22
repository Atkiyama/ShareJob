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




const origin: string = "origin";
// メイン処理
const main = async (): Promise<void> => {
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(origin, salt);
    const judge: boolean = await bcrypt.compare(origin, hashedPassword)
    console.log(judge);
};

// メイン処理の実行
main();
