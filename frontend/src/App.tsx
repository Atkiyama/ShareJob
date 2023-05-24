import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Top from './pages/top';
import Login from './pages/user/login';
import Logout from './pages/user/logout';
import Register from './pages/user/register';
import './App.css';
import { UserType, CompanyInfoType, CompanyType } from './utils/types';

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

	const updateCompanyInfoList = (updatedCompanyInfoList: CompanyInfoType[]) => {
		setCompanyInfoList(updatedCompanyInfoList);
	};

	const [companyList, setCompanyList] = useState<CompanyType[]>([]);

	const updateCompanyList = (updatedCompanyList: CompanyType[]) => {
		setCompanyList(updatedCompanyList);
	};
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
	useEffect(() => {
		document.title = 'ShareJob';
		if (user.email !== '') {
			handleCompanyInfoList();
		}
	}, [user.email]);

	const handleCompanyList = async () => {
		try {
			const ids: string[] = companyInfoList.map((info) => info.id);
			const joinedString = ids.join(',');
			const encodedIds = encodeURIComponent(joinedString);
			const req = `http://localhost:5000/company/getCompanyList?ids=${encodedIds}`;

			const response = await fetch(req, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const jsonResponse = await response.json();
			const jsonCompanyList = jsonResponse.companyList;

			updateCompanyList(jsonCompanyList);
		} catch (err) {
			alert('企業情報の取得に失敗しました\n' + err);
			console.log(err);
		}
	};

	useEffect(() => {
		if (user.email !== '' && companyInfoList.length > 0) {
			handleCompanyList();
		}
	}, [user.email, companyInfoList]);

	return (
		<BrowserRouter>
			<div className="container">
				<Header />
				<Routes>
					<Route path="/" element={<Top />} />
					<Route
						path="/pages/home"
						element={
							<Home
								user={user}
								companyInfoList={companyInfoList}
								companyList={companyList}
								updateCompanyList={updateCompanyList}
							/>
						}
					/>
					<Route
						path="/pages/user/login"
						element={
							<Login
								handleCompanyInfoList={handleCompanyInfoList}
								handleCompanyList={handleCompanyList}
								updateUser={updateUser}
							/>
						}
					/>
					<Route
						path="/pages/user/logout"
						element={<Logout user={user} updateUser={updateUser} />}
					/>
					<Route path="/pages/user/register" element={<Register />} />
					<Route path="*" element={<h1>Page Not Found</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
