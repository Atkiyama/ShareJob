export type UserType = {
    name: string,
    email: string,
    companyInfoList: number[]
}
export interface LoginProps {
    updateUser: (user: UserType) => void;
}