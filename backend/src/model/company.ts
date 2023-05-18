import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Company extends Document {
    id: number,
    name: string;
    abstract: string;
    industries: string[],
    locations: string[],

}



const CompanySchema: Schema<Company> = new Schema<Company>({
    id: {
        type: Number,
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

});




export const CompanyModel: Model<Company> = mongoose.model<Company>('Company', CompanySchema);
