import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * 会社のメモ情報のモデル
 */
export interface MyCompany extends Document {
    email: string
    id: string,
    memo: string;


}



const MyCompanySchema: Schema<MyCompany> = new Schema<MyCompany>({
    email: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },

    memo: {
        type: String,
        required: false,
    },


}, {
    collection: 'myCompany' // コレクション名を指定
});
MyCompanySchema.index({ email: 1, id: 1 }, { unique: true });



export const MyCompanyModel: Model<MyCompany> = mongoose.model<MyCompany>(
    'myCompany',
    MyCompanySchema
);
