import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Top from './pages/top';
import Login from './pages/user/login';
import Logout from './pages/user/logout';
import Register from './pages/user/register';
import './App.css';
import { UserType, CompanyInfoType, CompanyType } from './utils/types';
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

	const [companyList, setCompanyList] = useState<CompanyType[]>([]);

	const updateCompanyList = (updateCompanyList: CompanyType[]) => {
		setCompanyList(updateCompanyList);
	};

	useEffect(() => {
		if (user.email !== '') {
			const handleCompanyInfoList = async () => {
				try {
					const response = await fetch(
						`http://localhost:5000/companyInfo/getCompanyInfoList?email=${user.email}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);

					const jsonResponse = await response.json();
					const jsonCompanyInfoList = jsonResponse.CompanyInfoList;
					updateCompanyInfoList(jsonCompanyInfoList);
				} catch (err) {
					alert('企業情報の取得に失敗しました\n' + err);
					console.log(err);
				}
			};
			handleCompanyInfoList();
		}
	}, [user.email]);

	useEffect(() => {
		if (user.email !== '') {
			const handleCompanyList = async () => {
				try {
					const response = await fetch(
						`http://localhost:5000/companyInfo/getCompanyInfoList?email=${user.email}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);

					const jsonResponse = await response.json();
					const jsonCompanyInfoList = jsonResponse.CompanyInfoList;
					updateCompanyInfoList(jsonCompanyInfoList);
				} catch (err) {
					alert('企業情報の取得に失敗しました\n' + err);
					console.log(err);
				}
			};
			handleCompanyList();
		}
	}, [companyInfoList]);

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
