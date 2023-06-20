import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey: string = process.env.SECRET_KEY!;


const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "トークンがありません" });
    }

    try {
        const decode = jwt.verify(token, secretKey) as JwtPayload;
        return next();
    } catch (err) {
        return res
            .status(400)
            .json({ message: "トークンが正しくないのでログインしてください" });
    }
};

export default auth;
