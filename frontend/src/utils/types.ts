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
 * ログアウト画面のprops
 */
export interface LoginProps {
    updatedLoginFlag: (updatedLoginFlag: boolean) => void;

}

export interface HeaderProps {
    user: UserType;

}

/**
 * ログアウト画面のprops
 */
export interface LogoutProps {
    user: UserType;
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateMyCompanyList: (updatedMyCompanyList: MyCompanyType[]) => void;
    updateSearchCompanyList: (updateSearchCompanyList: CompanyType[]) => void;
}

/**
 * 企業メモのデータ型
 */
export type MyCompanyType = {
    email: string,
    id: string,
    memo: string,

}

/**
 * ホーム画面のprops
 */
export type HomeProps = {
    user: UserType;
    myCompanyList: MyCompanyType[];
    companyList: CompanyType[];

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
export type MyCompanyTableType = {
    name: string,
    memo: string,
    email: string,
    id: string,
}

/**
 * メモ編集画面のprops
 */
export interface EditMemoProps {

    companyList: CompanyType[],
    myCompanyList: MyCompanyType[],

    updateMyCompanyList: (updatedMyCompanyList: MyCompanyType[]) => void;
    handleUpdate: () => void;

}

/**
 * ユーザ編集画面のprops
 */
export interface EditUserProps {
    user: UserType,
    updateCompanyList: (updatedCompanyList: CompanyType[]) => void;
    updateMyCompanyList: (updatedMyCompanyList: MyCompanyType[]) => void;
    handleUpdate: () => void;
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


/**
 * 企業リストのprops
 */
export interface CompanyListProps {
    user: UserType,
    registerCompanyList: CompanyType[]
    updateRegisterCompanyList: (updatedRegisterCompanyList: CompanyType[]) => void;

}

/**
 * 企業編集画面のprops
 */
export interface CompanyEditProps {

    registerCompanyList: CompanyType[],
    handleUpdate: () => void;

}

/**
 * companyの詳細を表示するコンポーネントのprops
 */
export interface CompanyDetailProps {
    company: CompanyType; // 例: 型の定義

}

export interface CompanyRegisterProps {
    user: UserType,
    handleUpdate: () => void;
}

export interface CompanyAddProps {
    user: UserType,
    searchedCompanyList: CompanyType[],
    handleUpdate: () => void;
}