import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Company extends Document {
    id: string,
    name: string;
    abstract: string;
    industries: string[],
    locations: string[],

}



const CompanySchema: Schema<Company> = new Schema<Company>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },

    abstract: {
        type: String,
        required: true,
    },
    industries: {
        type: [String],
        required: true,
    },
    locations: {
        type: [String],
        required: true,
    },

}, {
    collection: 'company' // コレクション名を指定
});



//ここでコレクション名を変更できる
export const CompanyModel: Model<Company> = mongoose.model<Company>('company', CompanySchema);
