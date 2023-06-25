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

import { MyCompanyType, CompanyType } from './utils/types';
import CompanyAdd from './pages/company/companyAdd';
import useToken from './utils/useToken';

function App() {
	/**
	 * ログイン管理のフラグ
	 */
	const [loginFlag, setLoginFlag] = useState<boolean>(false);

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
	const updateLoginFlag = (updatedLoginFlag: boolean) => {
		setLoginFlag(updatedLoginFlag);
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
	 * ログイン情報
	 */
	const user = useToken(loginFlag, updateLoginFlag);

	/**
	 *企業メモのリストを取得する
	 */
	const handleMyCompanyList = async () => {
		try {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL! +
					`myCompany/getMyCompanyList?email=${user.email}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
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
			const req =
				process.env.REACT_APP_BASE_URL! +
				`company/getCompanyList?ids=${encodedIds}`;

			const response = await fetch(req, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('token')}`,
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
				process.env.REACT_APP_BASE_URL! +
					`company/getRegisterCompanyList?email=${user.email}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
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

	useEffect(() => {
		document.title = 'ShareJob';
		if (user.email !== '') {
			handleUpdate();
		}
	}, [user.email]);

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
				<Header user={user} />

				{/* <p>user:{user.email}</p>
				<p>useToken:{useToken(loginFlag, updateLoginFlag).email}</p>

				<p>user{user.name}</p>
				<p>useToken:{useToken(loginFlag, updateLoginFlag).name}</p>
				<p>Token:{localStorage.getItem('token')}</p> */}
				<Routes>
					<Route path="/" element={<Top />} />
					<Route
						path="/pages/home"
						element={
							<Home
								user={user}
								myCompanyList={myCompanyList}
								companyList={companyList}
							/>
						}
					/>
					<Route
						path="/pages/user/login"
						element={<Login updatedLoginFlag={updateLoginFlag} />}
					/>
					<Route
						path="/pages/user/logout"
						element={
							<Logout
								user={user}
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
								updateCompanyList={updateCompanyList}
								updateMyCompanyList={updateMyCompanyList}
								handleUpdate={handleUpdate}
							/>
						}
					/>
					<Route path="/pages/user/register" element={<Register />} />
					<Route
						path="/pages/myCompany/myCompany/:email/:id"
						element={
							<EditMemo
								companyList={companyList}
								myCompanyList={myCompanyList}
								updateMyCompanyList={updateMyCompanyList}
								handleUpdate={handleUpdate}
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
								registerCompanyList={registerCompanyList}
								handleUpdate={handleUpdate}
							/>
						}
					/>
					<Route
						path="/pages/company/companyRegister"
						element={
							<CompanyRegister user={user} handleUpdate={handleUpdate} />
						}
					/>
					<Route
						path="/pages/company/companyAdd/:id"
						element={
							<CompanyAdd
								user={user}
								searchedCompanyList={searchedCompany}
								handleUpdate={handleUpdate}
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
