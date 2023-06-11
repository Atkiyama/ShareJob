import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyEditProps, CompanyType } from '../../utils/types';

/**
 * 企業情報を編集する(制作中)
 * @param id 編集する企業のid
 * @returns
 */
function CompanyEdit({
	searchedCompany,
	user,
	companyList,
	myCompanyList,
	companyInfoList,
	updateUser,
	updateCompanyList,
	updateMyCompanyList,
	updateCompanyInfoList,
}: CompanyEditProps) {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [company, setCompany] = useState<CompanyType | undefined>(undefined);
	const [newTextBoxes, setNewTextBoxes] = useState<string[]>([]);

	/**
	 * idに合致するcompanyをセットする
	 */
	useEffect(() => {
		const foundCompany = myCompanyList.find((item) => item.id === id);

		if (foundCompany) {
			setCompany(foundCompany);
			document.title = `${foundCompany.name}`;
		}
	}, [id, myCompanyList]);

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

	const handleAddTextBox = () => {
		setNewTextBoxes((prevTextBoxes) => [...prevTextBoxes, '']);
	};

	const handleRemoveTextBox = (index: number) => {
		setNewTextBoxes((prevTextBoxes) => {
			const updatedTextBoxes = [...prevTextBoxes];
			updatedTextBoxes.splice(index, 1);
			return updatedTextBoxes;
		});
	};

	const handleSave = () => {
		// 保存する処理を行う
		console.log(company);
		// ... 保存処理のコード ...
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
		navigate('/pages/company/searchCompany');
	};

	if (company) {
		return (
			<div>
				<h1>
					<input type="text" value={company.name} onChange={handleNameChange} />
				</h1>
				<h2>概要</h2>
				<div>
					<input
						type="text"
						value={company.abstract}
						onChange={handleAbstractChange}
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
					/>
				</div>
				<h2>勤務地</h2>
				<div>
					*複数の勤務地を入力する場合、半角「,」で区切って入力してください
				</div>
				<div>
					<input
						type="text"
						value={company.industries.join(',')}
						onChange={handleIndustriesChange}
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