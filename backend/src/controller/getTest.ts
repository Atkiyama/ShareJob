import { Request, Response } from 'express';
import { UserModel, User } from '../model/user';
import connectDB from '../utils/database';

export default async function postUser(req: Request, res: Response) {
    try {
        console.log(req.body.email)
        return res.status(200).json({ message: 'getSuccess' });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'getFailed' });
    }
}
