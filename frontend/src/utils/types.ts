import { CompanyInfo } from '../../../backend/src/model/companyInfo';
import { Company } from '../../../backend/src/model/company';
export type UserType = {
    name: string,
    email: string,
    companyInfoList: string[]
}
export interface LoginProps {
    updateUser: (user: UserType) => void;
}


export type CompanyInfoType = {
    email: string,
    id: string,
    memo: string,

}
export interface CompanyInfoProps {
    updateCompanyInfo: (companyInfo: CompanyInfoType) => void;
}

export type HomeProps = {
    user: UserType;
    companyInfoList: CompanyInfoType[];
    companyList: CompanyType[];
};

export type CompanyType = {
    id: string,
    name: string,
    abstract: string,
    industries: string[],
    locations: string[],

}
export interface CompanyProps {
    updateCompany: (company: CompanyType) => void;
}

export type CompanyInfoTableType = {
    name: string,
    memo: string,
}