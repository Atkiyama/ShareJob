import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    companyInfoList: string[];
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
    companyInfoList: {
        type: [String],
        required: false,
    },
}, {
    collection: 'user' // コレクション名を指定
});




export const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);
