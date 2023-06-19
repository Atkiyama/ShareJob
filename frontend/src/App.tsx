import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import Home from './pages/home';
import Top from './pages/top';
import Login from './pages/user/login';
import Logout from './pages/user/logout';
import Register from './pages/user/register';
import EditMemo from './pages/myCompany/editMemo';
import EditUser from './pages/user/editUser';
import SearchCompany from './pages/company/searchCompany';
import CompanyRegister from './pages/company/companyRegister';
import CompanyList from './pages/company/companyList';
import CompanyEdit from './pages/company/companyEdit';

import { UserType, MyCompanyType, CompanyType } from './utils/types';
import CompanyDetail from './components/companyDetail';

function App() {
	/**
	 * ログインしているユーザの情報
	 */
	const [user, setUser] = useState<UserType>({
		name: '',
		email: '',
	});

	/**
	 * ユーザの企業メモ
	 */
	const [myCompanyList, setMyCompanyList] = useState<MyCompanyType[]>([]);
	/**
	 * メモを登録している企業のリスト
	 */
	const [companyList, setCompanyList] = useState<CompanyType[]>([]);
	/**
	 * 自分で登録した企業のリスト
	 */
	const [registerCompanyList, setRegisterCompanyList] = useState<CompanyType[]>(
		[]
	);
	/**
	 * 検索した企業のリスト
	 */
	const [searchedCompany, setSearchedCompany] = useState<CompanyType[]>([]);

	/**
	 * 以下、下位のコンポーネントで各変数を更新するための関数
	 * @param updatedUser
	 */

	const updateUser = (updatedUser: UserType) => {
		setUser(updatedUser);
	};

	const updateMyCompanyList = (updatedMyCompanyList: MyCompanyType[]) => {
		setMyCompanyList(updatedMyCompanyList);
	};

	const updateCompanyList = (updatedCompanyList: CompanyType[]) => {
		setCompanyList(updatedCompanyList);
	};

	const updateRegisterCompanyList = (
		updatedRegisterCompanyList: CompanyType[]
	) => {
		setRegisterCompanyList(updatedRegisterCompanyList);
	};

	const updateSearchCompanyList = (
		updatedSearchedCompanyList: CompanyType[]
	) => {
		setSearchedCompany(updatedSearchedCompanyList);
	};

	/**
	 *企業メモのリストを取得する
	 */
	const handleMyCompanyList = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/myCompany/getMyCompanyList?email=${user.email}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const jsonResponse = await response.json();
			const jsonMyCompanyList = jsonResponse.myCompanyList;
			updateMyCompanyList(jsonMyCompanyList);
		} catch (err) {
			alert('企業情報の取得に失敗しました\n' + err);
			console.log(err);
		}
	};
	/**
	 *メモを登録している企業のリストを取得する
	 */
	const handleCompanyList = async () => {
		try {
			const ids: string[] = myCompanyList.map((info) => info.id);
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

	const handleRegisterCompanyList = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/company/getRegisterCompanyList?email=${user.email}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const jsonResponse = await response.json();
			const jsonMyCompanyList = jsonResponse.myCompanyList;
			updateRegisterCompanyList(jsonMyCompanyList);
		} catch (err) {
			alert('企業情報の取得に失敗しました\n' + err);
			console.log(err);
		}
	};

	const handleUpdate = async () => {
		await handleMyCompanyList();
		await handleCompanyList();
		await handleRegisterCompanyList();
	};
	/**
	 * companyInfoListを取得する
	 */
	useEffect(() => {
		document.title = 'ShareJob';
		if (user.email !== '') {
			handleMyCompanyList();
		}
	}, [user.email]);

	/**
	 * companyListを取得する
	 */
	useEffect(() => {
		if (user.email !== '' && myCompanyList.length > 0) {
			handleCompanyList();
		}
	}, [user.email, myCompanyList]);

	/**
	 * 常にユーザ以外の情報を更新する
	 */
	useEffect(() => {
		if (user.email !== '') {
			handleUpdate();
		}
	}, []);

	/**
	 * 各コンポーネントをルーティングする
	 */
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
								myCompanyList={myCompanyList}
								companyList={companyList}
								updateCompanyList={updateCompanyList}
							/>
						}
					/>
					<Route
						path="/pages/user/login"
						element={
							<Login
								handleMyCompanyList={handleMyCompanyList}
								handleCompanyList={handleCompanyList}
								updateUser={updateUser}
							/>
						}
					/>
					<Route
						path="/pages/user/logout"
						element={
							<Logout
								user={user}
								updateUser={updateUser}
								updateCompanyList={updateCompanyList}
								updateMyCompanyList={updateMyCompanyList}
								updateSearchCompanyList={updateSearchCompanyList}
							/>
						}
					/>
					<Route
						path="/pages/user/editUser"
						element={
							<EditUser
								user={user}
								updateUser={updateUser}
								updateCompanyList={updateCompanyList}
								updateMyCompanyList={updateMyCompanyList}
							/>
						}
					/>
					<Route path="/pages/user/register" element={<Register />} />
					<Route
						path="/pages/myCompany/myCompany/:email/:id"
						element={
							<EditMemo
								user={user}
								companyList={companyList}
								myCompanyList={myCompanyList}
								updateUser={updateUser}
								updateMyCompanyList={updateMyCompanyList}
							/>
						}
					/>
					<Route
						path="/pages/company/searchCompany"
						element={
							<SearchCompany
								searchedCompany={searchedCompany}
								updateSearchCompanyList={updateSearchCompanyList}
							/>
						}
					/>

					<Route
						path="/pages/company/companyList"
						element={
							<CompanyList
								user={user}
								registerCompanyList={registerCompanyList}
								updateRegisterCompanyList={updateRegisterCompanyList}
							/>
						}
					/>
					<Route
						path="/pages/company/companyEdit/:id"
						element={
							<CompanyEdit
								searchedCompany={searchedCompany}
								user={user}
								companyList={companyList}
								registerCompanyList={registerCompanyList}
								myCompanyList={myCompanyList}
								updateUser={updateUser}
								updateCompanyList={updateCompanyList}
								updateMyCompanyList={updateMyCompanyList}
								updateRegisterCompanyList={updateRegisterCompanyList}
							/>
						}
					/>
					<Route
						path="/pages/company/companyRegister"
						element={<CompanyRegister user={user} />}
					/>

					<Route path="*" element={<h1>Page Not Found</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
