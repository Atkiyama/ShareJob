import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	CompanyDetailProps,
	CompanyInfoType,
	CompanyType,
} from '../../utils/types';

/**
 * 検索画面から企業の詳細確認できる画面
 * @param param0 企業id
 * @returns
 */
function CompanyDetail({
	searchedCompany,
	user,
	companyList,
	companyInfoList,
	updateUser,
	updateCompanyList,
	updateCompanyInfoList,
}: CompanyDetailProps) {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	//idに合致するid
	const [company, setCompany] = useState<CompanyType>();
	/**
	 *idに合致する企業情報を取得する
	 */
	useEffect(() => {
		const foundCompany = searchedCompany.find((item) => item.id === id);

		if (foundCompany) {
			setCompany(foundCompany);
			if (typeof company !== 'undefined') {
				document.title = `${company.name}`;
			}
		}
	});
	/**
	 *バックエンドに企業メモを登録する
	 */
	const handleRegisterCompanyInfo = async () => {
		try {
			await fetch(`http://localhost:5000/companyInfo/registerCompanyInfo`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user.email,
					id: id,
					memo: '',
				}),
			});

			if (company) {
				alert(`${company.name}を登録しました`);
			}
		} catch (err) {
			alert('登録に失敗しました');
		}
	};

	/**
	 * ユーザ情報を更新する
	 */
	const handleUser = async () => {
		await fetch(`http://localhost:5000/user/update/${user.email}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: user.name,
				companyInfoList: user.companyInfoList,
			}),
		});
	};

	/**
	 * 企業リストにidの企業を加える
	 */
	const handleAdd = () => {
		const findId: string | undefined = user.companyInfoList.find(
			(item) => item === id
		);
		if (!findId) {
			const companyInfoListSt = user.companyInfoList;
			if (typeof id === 'string') {
				companyInfoListSt.push(id);
			}
			const updatedUser = {
				name: user.name,
				email: user.email,
				companyInfoList: companyInfoListSt,
			};
			updateUser(updatedUser);
			if (id) {
				const CompanyInfo: CompanyInfoType = {
					email: user.email,
					id: id,
					memo: '',
				};
				const updatedCompanyInfoList: CompanyInfoType[] = companyInfoList;
				updatedCompanyInfoList.push(CompanyInfo);
				updateCompanyInfoList(updatedCompanyInfoList);
				const findCompany: CompanyType | undefined = companyList.find(
					(item) => item.id === id
				);
				if (!findCompany && company) {
					const updatedCompanyList: CompanyType[] = companyList;
					updatedCompanyList.push(company);
					updateCompanyList(updatedCompanyList);
				}
			}
		}
		handleRegisterCompanyInfo();
		handleUser();
		if (company) {
			alert(`${company.name}を登録しました`);
		}

		navigate('/pages/company/searchCompany');
	};

	/**
	 * キャンセルボタンを押すと検索画面に戻る
	 */
	const handleReturn = () => {
		navigate('/pages/company/searchCompany');
	};

	if (typeof company !== 'undefined') {
		return (
			<div>
				<h1>{company.name}</h1>
				<h2>概要</h2>
				<div>{company.abstract}</div>
				<h2>業種</h2>
				<div>{company.industries.join(',')}</div>
				<h2>勤務地</h2>
				<div>{company.locations.join(',')}</div>
				<button onClick={() => handleAdd()}>登録</button>
				<button onClick={() => handleReturn()}>戻る</button>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export default CompanyDetail;
