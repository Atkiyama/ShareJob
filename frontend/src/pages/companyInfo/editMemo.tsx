import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	EditMemoProps,
	CompanyInfoType,
	CompanyType,
	UserType,
} from '../../utils/types';

function EditMemo({
	user,
	companyList,
	companyInfoList,
	updateUser,
	updateCompanyInfoList,
}: EditMemoProps) {
	const { email, id } = useParams();
	const navigate = useNavigate();
	// 対応する会社情報を探す
	const company: CompanyType | undefined = companyList.find(
		(info) => info.id === id
	);
	//対応するメモを探す
	const companyInfo: CompanyInfoType | undefined = companyInfoList.find(
		(info) => info.id === id && info.email === email
	);

	const [memo, setMemo] = useState<string>(companyInfo?.memo || '');

	const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMemo(event.target.value);
	};
	/**
	 *APIにupdateリクエストする
	 */
	const handleUpdate = async () => {
		try {
			await fetch(
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
			if (company) {
				alert(`${company.name}のメモを登録しました`);
			}
		} catch (err) {
			alert('更新に失敗しました');
		}
	};

	/**
	 * ユーザ情報を更新する
	 */
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

	/**
	 * メモ削除の処理をする
	 */
	const handleDelete = async () => {
		const confirmDelete = window.confirm('本当にメモを削除しますか？');
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
	/**
	 *完了ボタンが押されたときの処理を実装する
	 */
	const handleComplete = () => {
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

	/**
	 * タイトルを更新する
	 */
	useEffect(() => {
		if (company) {
			document.title = `${company.name}のメモ`;
		}
	});

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

export default EditMemo;
