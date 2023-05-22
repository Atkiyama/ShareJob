import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Top from './pages/top';
import Login from './pages/user/login';
import Logout from './pages/user/logout';
import Register from './pages/user/register';
import './App.css';
import { UserType, CompanyInfoType } from './utils/types';
import { Company } from '../../backend/src/model/company';

function App() {
	const [user, setUser] = useState<UserType>({
		name: '',
		email: '',
		companyInfoList: [],
	});

	const [companyInfoList, setCompanyInfoList] = useState<CompanyInfoType[]>([]);

	const updateUser = (updatedUser: UserType) => {
		setUser(updatedUser);
	};

	const updateCompanyInfoList = (updateCompanyInfoList: CompanyInfoType[]) => {
		setCompanyInfoList(updateCompanyInfoList);
	};
	return (
		<BrowserRouter>
			<div className="container">
				<Header />
				<Routes>
					<Route path="/" element={<Top />} />
					<Route
						path="/pages/home"
						element={<Home user={user} companyInfoList={companyInfoList} />}
					/>
					<Route
						path="/pages/user/login"
						element={<Login updateUser={updateUser} />}
					/>
					<Route
						path="/pages/user/logout"
						element={<Logout updateUser={updateUser} />}
					/>
					<Route path="/pages/user/register" element={<Register />} />
					<Route path="*" element={<h1>Page Not Found</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
