import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
	CompanyInfoProps,
	CompanyInfoType,
	CompanyType,
	UserType,
} from '../../utils/types';

function CompanyInfoEdit({
	user,
	companyList,
	companyInfoList,
	updateUser,
	updateCompanyInfoList,
}: CompanyInfoProps) {
	const { email, id } = useParams();
	const navigate = useNavigate();
	// 対応する会社情報を探す
	const company: CompanyType | undefined = companyList.find(
		(info) => info.id === id
	);

	const companyInfo: CompanyInfoType | undefined = companyInfoList.find(
		(info) => info.id === id && info.email === email
	);

	const [memo, setMemo] = useState<string>(companyInfo?.memo || '');

	const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMemo(event.target.value);
	};

	const handleUpdate = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/companyInfo/updateCompanyInfo/${email}/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						memo: memo,
					}),
				}
			);

			const jsonResponse = await response.json();
			alert(jsonResponse.message);
		} catch (err) {
			alert('更新に失敗しました');
		}
	};
	const handleUser = async () => {
		const list: string[] = [];
		for (let i = 0; i < user.companyInfoList.length; i++) {
			if (user.companyInfoList[i] !== id) {
				list.push(user.companyInfoList[i]);
			}
		}
		const updatedUser: UserType = {
			name: user.name,
			email: user.email,
			companyInfoList: list,
		};
		await fetch(`http://localhost:5000/user/update/${email}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: user.name,
				companyInfoList: list,
			}),
		});

		updateUser(updatedUser);
	};
	const handleDelete = async () => {
		const confirmDelete = window.confirm('本当に削除しますか？');
		if (confirmDelete) {
			try {
				const response = await fetch(
					`http://localhost:5000/companyInfo/deleteCompanyInfo/${email}/${id}`,
					{
						method: 'DELETE',
					}
				);

				const jsonResponse = await response.json();
				alert(jsonResponse.message);

				// 削除が成功したら、リストから削除した情報を更新する
				const updatedCompanyInfoList = companyInfoList.filter(
					(info) => info.id !== id
				);
				updateCompanyInfoList(updatedCompanyInfoList);
				handleUser();

				// 削除後にリダイレクトするならば以下の行を有効化する
				navigate('/pages/home');
			} catch (err) {
				alert('削除に失敗しました');
			}
		}
	};

	const handleComplete = () => {
		// 完了ボタンが押されたときの処理を実装する
		const updatedCompanyInfoList = companyInfoList.map((info) => {
			if (info.email === email && info.id === id) {
				return {
					...info,
					memo: memo,
				};
			}
			return info;
		});

		updateCompanyInfoList(updatedCompanyInfoList);
		handleUpdate();
		navigate('/pages/home');
	};

	return (
		<div>
			{company ? <h2>{company.name}のメモ</h2> : null}
			<div className="textarea-container">
				<textarea
					className="textarea"
					rows={5}
					value={memo}
					onChange={handleMemoChange}
				/>
			</div>
			<button onClick={handleComplete}>完了</button>
			<button onClick={handleDelete}>消去</button>
		</div>
	);
}

export default CompanyInfoEdit;
