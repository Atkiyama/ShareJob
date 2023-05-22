export type UserType = {
    name: string,
    email: string,
    companyInfoList: number[]
}
export interface LoginProps {
    updateUser: (user: UserType) => void;
}


export type CompanyInfoType = {
    email: string,
    name: string,
    memo: string,

}
export interface CompanyInfoProps {
    updateCompanyInfo: (companyInfo: CompanyInfoType) => void;
}

export type HomeProps = {
    user: UserType;
    companyInfoList: CompanyInfoType[];
};