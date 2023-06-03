export type UserType = {
    name: string,
    email: string,
    companyInfoList: string[]
}
export interface LoginProps {
    updateUser: (user: UserType) => void;
    handleCompanyInfoList: () => void;
    handleCompanyList: () => void;

}
export interface LogoutProps {
    user: UserType,
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;
    updateSearchCompanyList: (updateSearchCompanyList: CompanyType[]) => void;
}


export type CompanyInfoType = {
    email: string,
    id: string,
    memo: string,

}


export type HomeProps = {
    user: UserType;
    companyInfoList: CompanyInfoType[];
    companyList: CompanyType[];
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
};



export type CompanyType = {
    id: string,
    name: string,
    abstract: string,
    industries: string[],
    locations: string[],

}
/*
export interface CompanyProps {
    updateCompany: (company: CompanyType) => void;
}*/

export type CompanyInfoTableType = {
    name: string,
    memo: string,
    email: string,
    id: string,
}

export interface EditMemoProps {
    user: UserType,
    companyList: CompanyType[],
    companyInfoList: CompanyInfoType[],
    updateUser: (user: UserType) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;
    //updateCompanyInfo: (updatedCompanyInfo: CompanyInfoType) => void; // 追加


}

export interface EditUserProps {
    user: UserType,
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;
}

export type CompanyTableType = {
    name: string,
    abstract: string,
    id: string,
}

export interface SearchCompanyProps {
    searchedCompany: CompanyType[],
    updateSearchCompanyList: (
        updatedSearchedCompanyList: CompanyType[]
    ) => void;
}
export interface CompanyDetailProps {
    searchedCompany: CompanyType[],
    user: UserType,
    companyList: CompanyType[],
    companyInfoList: CompanyInfoType[],
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;

}