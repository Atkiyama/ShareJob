import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CompanyInfo extends Document {
    email: string
    id: string,
    memo: string;


}



const CompanyInfoSchema: Schema<CompanyInfo> = new Schema<CompanyInfo>({
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
        required: true,
    },


}, {
    collection: 'companyInfo' // コレクション名を指定
});
CompanyInfoSchema.index({ email: 1, id: 1 }, { unique: true });



export const CompanyInfoModel: Model<CompanyInfo> = mongoose.model<CompanyInfo>(
    'companyInfo',
    CompanyInfoSchema
);
