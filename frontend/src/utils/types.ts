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
};

export type CompanyType = {
    id: string,
    name: string,
    abstract: string,
    industries: string[],
    locations: string[],

}
export interface CompanyInfoProps {
    updateCompanyInfo: (companyInfo: CompanyInfoType) => void;
}