/**
 * 様々なデータ型を定義
 */

/**
 * ユーザのデータ型
 */
export type UserType = {
    name: string,
    email: string,
}

/**
 * ログイン画面のprops
 */
export interface LoginProps {
    updateUser: (user: UserType) => void;
    handleCompanyInfoList: () => void;
    handleCompanyList: () => void;
}

/**
 * ログアウト画面のprops
 */
export interface LogoutProps {
    user: UserType,
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;
    updateSearchCompanyList: (updateSearchCompanyList: CompanyType[]) => void;
}

/**
 * 企業メモのデータ型
 */
export type CompanyInfoType = {
    email: string,
    id: string,
    memo: string,

}

/**
 * ホーム画面のprops
 */
export type HomeProps = {
    user: UserType;
    companyInfoList: CompanyInfoType[];
    companyList: CompanyType[];
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
};


/**
 * 企業のデータ型
 */
export type CompanyType = {
    id: string,
    name: string,
    author: string,
    abstract: string,
    industries: string[],
    locations: string[],

}

/**
 * companyInfoをhome画面でテーブルにする際に用いる型
 */
export type CompanyInfoTableType = {
    name: string,
    memo: string,
    email: string,
    id: string,
}

/**
 * メモ編集画面のprops
 */
export interface EditMemoProps {
    user: UserType,
    companyList: CompanyType[],
    companyInfoList: CompanyInfoType[],
    updateUser: (user: UserType) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;

}

/**
 * ユーザ編集画面のprops
 */
export interface EditUserProps {
    user: UserType,
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;
}

/**
 * 企業検索画面や企業リストの表に使うデータ型
 */
export type CompanyTableType = {
    name: string,
    abstract: string,
    id: string,
}

/**
 * 企業検索画面のprops
 */
export interface SearchCompanyProps {
    searchedCompany: CompanyType[],
    updateSearchCompanyList: (
        updatedSearchedCompanyList: CompanyType[]
    ) => void;
}

/**
 * 企業詳細画面のprops
 */
export interface CompanyRegisterProps {
    searchedCompany: CompanyType[],
    user: UserType,
    companyList: CompanyType[],
    companyInfoList: CompanyInfoType[],
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;

}

/**
 * 企業リストのprops
 */
export interface CompanyListProps {
    user: UserType,
    myCompanyList: CompanyType[]
    updateMyCompanyList: (updatedMyCompanyList: CompanyType[]) => void;
}

/**
 * 企業編集画面のprops
 */
export interface CompanyEditProps {
    searchedCompany: CompanyType[],
    user: UserType,
    companyList: CompanyType[],
    myCompanyList: CompanyType[],
    companyInfoList: CompanyInfoType[],
    updateUser: (user: UserType) => void;
    updateCompanyList: (updatedMyCompanyList: CompanyType[]) => void;
    updateMyCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateCompanyInfoList: (updatedCompanyInfoList: CompanyInfoType[]) => void;

}

/**
 * companyの詳細を表示するコンポーネントのprops
 */
export interface CompanyDetailProps {
    company: CompanyType; // 例: 型の定義
    // 他のプロパティ
}