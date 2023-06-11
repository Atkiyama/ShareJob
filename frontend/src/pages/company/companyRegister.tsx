import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	CompanyRegisterProps,
	CompanyInfoType,
	CompanyType,
} from '../../utils/types';
import CompanyDetail from '../../components/companyDetail';

/**
 * 検索画面から企業の詳細確認できる画面
 * @param param0 企業id
 * @returns
 */
function CompanyRegister({
	searchedCompany,
	user,
	companyList,
	companyInfoList,
	updateUser,
	updateCompanyList,
	updateCompanyInfoList,
}: CompanyRegisterProps) {
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
	 * 企業リストにidの企業を加える
	 */
	const handleAdd = () => {
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

		handleRegisterCompanyInfo();

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
				<CompanyDetail company={company} />
				<button onClick={() => handleAdd()}>登録</button>
				<button onClick={() => handleReturn()}>戻る</button>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export default CompanyRegister;
