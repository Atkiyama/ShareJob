import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyRegisterProps, CompanyType } from '../../utils/types';

/**
 * 検索画面から企業の詳細確認できる画面
 * @param param0 企業id
 * @returns
 */
function CompanyRegister({ user, handleUpdate }: CompanyRegisterProps) {
	const navigate = useNavigate();
	//idに合致するid
	const [company, setCompany] = useState<CompanyType>({
		id: '',
		name: '',
		author: '',
		abstract: '',
		industries: [],
		locations: [],
	});
	/**
	 *idに合致する企業情報を取得する
	 */
	useEffect(() => {
		document.title = `企業新規登録`;
	});
	/**
	 *バックエンドに企業メモを登録する
	 */
	const handleRegisterMyCompany = async () => {
		try {
			await fetch(process.env.REACT_APP_BASE_URL! + `company/registerCompany`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					name: company.name,
					author: user.email,
					abstract: company.abstract,
					industries: company.industries,
					locations: company.locations,
				}),
			});

			if (company) {
				alert(`${company.name}を登録しました`);
			} else {
				alert(`企業を登録しました`);
			}
		} catch (err) {
			alert('登録に失敗しました');
		}
	};

	/**
	 * 企業リストにidの企業を加える
	 */
	const handleSave = () => {
		handleRegisterMyCompany();
		handleUpdate();
		navigate('/pages/company/companyList');
	};

	/**
	 * キャンセルボタンを押すと検索画面に戻る
	 */
	const handleReturn = () => {
		navigate('/pages/company/companyList');
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (company) {
			const updatedCompany: CompanyType = {
				id: company.id,
				name: value,
				author: company.author,
				abstract: company.abstract,
				industries: company.industries,
				locations: company.locations,
			};
			setCompany(updatedCompany);
		}
	};

	const handleAbstractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (company) {
			const updatedCompany: CompanyType = {
				id: company.id,
				name: company.name,
				author: company.author,
				abstract: value,
				industries: company.industries,
				locations: company.locations,
			};
			setCompany(updatedCompany);
		}
	};

	const handleIndustriesChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = event.target;
		if (company) {
			const updatedCompany: CompanyType = {
				id: company.id,
				name: company.name,
				author: company.author,
				abstract: company.abstract,
				industries: value.split(','),
				locations: company.locations,
			};
			setCompany(updatedCompany);
		}
	};

	const handleLocationsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = event.target;
		if (company) {
			const updatedCompany: CompanyType = {
				id: company.id,
				name: company.name,
				author: company.author,
				abstract: company.abstract,
				industries: company.industries,
				locations: value.split(','),
			};
			setCompany(updatedCompany);
		}
	};
	if (company) {
		return (
			<div>
				<h1>
					<input
						type="text"
						value={company.name}
						onChange={handleNameChange}
						className="textarea"
					/>
				</h1>
				<h2>概要</h2>
				<div>
					<input
						type="text"
						value={company.abstract}
						onChange={handleAbstractChange}
						className="textarea-container"
					/>
				</div>
				<h2>業種</h2>
				<div>
					*複数の業種を入力する場合、半角「,」で区切って入力してください
				</div>
				<div>
					<input
						type="text"
						value={company.industries.join(',')}
						onChange={handleIndustriesChange}
						className="textarea-container"
					/>
				</div>
				<h2>勤務地</h2>
				<div>
					*複数の勤務地を入力する場合、半角「,」で区切って入力してください
				</div>
				<div>
					<input
						type="text"
						value={company.locations.join(',')}
						onChange={handleLocationsChange}
						className="textarea-container"
					/>
				</div>

				<button onClick={handleSave}>保存</button>
				<button onClick={handleReturn}>戻る</button>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export default CompanyRegister;
