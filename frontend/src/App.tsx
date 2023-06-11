import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Header from './components/header';
import Home from './pages/home';
import Top from './pages/top';
import Login from './pages/user/login';
import Logout from './pages/user/logout';
import Register from './pages/user/register';
import EditMemo from './pages/companyInfo/editMemo';
import EditUser from './pages/user/editUser';
import SearchCompany from './pages/company/searchCompany';
import CompanyDetail from './pages/company/companyDetail';
import CompanyList from './pages/company/companyList';
import CompanyEdit from './pages/company/companyEdit';

import { UserType, CompanyInfoType, CompanyType } from './utils/types';

function App() {
	/**
	 * ログインしているユーザの情報
	 */
	const [user, setUser] = useState<UserType>({
		name: '',
		email: '',
		companyInfoList: [],
	});

	/**
	 * ユーザの企業メモ
	 */
	const [companyInfoList, setCompanyInfoList] = useState<CompanyInfoType[]>([]);
	/**
	 * メモを登録している企業のリスト
	 */
	const [companyList, setCompanyList] = useState<CompanyType[]>([]);
	/**
	 * 自分で登録した企業のリスト
	 */
	const [myCompanyList, setMyCompanyList] = useState<CompanyType[]>([]);
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

	const updateCompanyInfoList = (updatedCompanyInfoList: CompanyInfoType[]) => {
		setCompanyInfoList(updatedCompanyInfoList);
	};

	const updateCompanyList = (updatedCompanyList: CompanyType[]) => {
		setCompanyList(updatedCompanyList);
	};

	const updateMyCompanyList = (updatedMyCompanyList: CompanyType[]) => {
		setMyCompanyList(updatedMyCompanyList);
	};

	const updateSearchCompanyList = (
		updatedSearchedCompanyList: CompanyType[]
	) => {
		setSearchedCompany(updatedSearchedCompanyList);
	};

	/**
	 *企業メモのリストを取得する
	 */
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
	/**
	 *メモを登録している企業のリストを取得する
	 */
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

	/**
	 * companyInfoListを取得する
	 */
	useEffect(() => {
		document.title = 'ShareJob';
		if (user.email !== '') {
			handleCompanyInfoList();
		}
	}, [user.email]);

	/**
	 * companyListを取得する
	 */
	useEffect(() => {
		if (user.email !== '' && companyInfoList.length > 0) {
			handleCompanyList();
		}
	}, [user.email, companyInfoList]);

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
						element={
							<Logout
								user={user}
								updateUser={updateUser}
								updateCompanyList={updateCompanyList}
								updateCompanyInfoList={updateCompanyInfoList}
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
								updateCompanyInfoList={updateCompanyInfoList}
							/>
						}
					/>
					<Route path="/pages/user/register" element={<Register />} />
					<Route
						path="/pages/companyInfo/companyInfo/:email/:id"
						element={
							<EditMemo
								user={user}
								companyList={companyList}
								companyInfoList={companyInfoList}
								updateUser={updateUser}
								updateCompanyInfoList={updateCompanyInfoList}
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
						path="/pages/company/companyDetail/:id"
						element={
							<CompanyDetail
								searchedCompany={searchedCompany}
								user={user}
								companyInfoList={companyInfoList}
								companyList={companyList}
								updateUser={updateUser}
								updateCompanyList={updateCompanyList}
								updateCompanyInfoList={updateCompanyInfoList}
							/>
						}
					/>
					<Route
						path="/pages/company/companyList"
						element={
							<CompanyList
								user={user}
								myCompanyList={myCompanyList}
								updateMyCompanyList={updateMyCompanyList}
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
								myCompanyList={myCompanyList}
								companyInfoList={companyInfoList}
								updateUser={updateUser}
								updateCompanyList={updateCompanyList}
								updateMyCompanyList={updateMyCompanyList}
								updateCompanyInfoList={updateCompanyInfoList}
							/>
						}
					/>

					<Route path="*" element={<h1>Page Not Found</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
