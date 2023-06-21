import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyEditProps, CompanyType } from '../../utils/types';

/**
 * 企業情報を編集する(制作中)
 * @param id 編集する企業のid
 * @returns
 */
function CompanyEdit({ registerCompanyList, handleUpdate }: CompanyEditProps) {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [company, setCompany] = useState<CompanyType | undefined>(undefined);

	/**
	 * idに合致するcompanyをセットする
	 */
	useEffect(() => {
		const foundCompany = registerCompanyList.find((item) => item.id === id);

		if (foundCompany) {
			setCompany(foundCompany);
			document.title = `${foundCompany.name}`;
		}
	}, []);

	const handleUpdateRegisterCompany = async () => {
		if (company) {
			try {
				const response = await fetch(
					process.env.REACT_APP_BASE_URL! + `company/updateCompany/${id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${localStorage.getItem('token')}`,
						},
						body: JSON.stringify({
							id: company.id,
							name: company.name,
							author: company.author,
							abstract: company.abstract,
							industries: company.industries,
							locations: company.locations,
						}),
					}
				);
				const jsonRes = await response.json();
				alert(jsonRes.message);
			} catch (err) {
				alert('更新に失敗しました');
			}
		}
	};

	const handleSave = () => {
		handleUpdateRegisterCompany();
		handleUpdate();
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

	const handleReturn = () => {
		navigate('/pages/company/companyList');
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

export default CompanyEdit;
