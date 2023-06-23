import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { UserType } from './types';


const useToken = (loginFlag: boolean, updateLoginFlag: (updatedLoginFlag: boolean) => void): typeof loginUser => {
    const [loginUser, setLoginUser] = useState<UserType>({
        name: '',
        email: '',
    });
    //const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleToken = (loginFlag: boolean) => {
        if (token) {
            const decoded: { email: string, name: string } = jwtDecode(token);

            const user: UserType = {
                name: decoded.name,
                email: decoded.email,
            };
            setLoginUser(user);
            if (!loginFlag) {
                updateLoginFlag(true);
            }

        } else {
            const user: UserType = {
                name: "",
                email: "",
            };
            setLoginUser(user);
            updateLoginFlag(false);
        }
    }
    useEffect(() => {
        handleToken(loginFlag);
    }, [token, loginFlag]);


    return loginUser;
};

export default useToken;