import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    companyInfo: number[];
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
    companyInfo: {
        type: [Number],
        required: false,
    },
});




export const UserModel: Model<User> = mongoose.model<User>('User', UserSchema);
