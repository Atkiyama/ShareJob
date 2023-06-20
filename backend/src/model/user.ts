import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * ユーザ情報のモデル
 */
export interface User extends Document {
    name: string;
    email: string;
    password: string;

}



const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, {
    collection: 'user' // コレクション名を指定
});




export const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);
