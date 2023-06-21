import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EditMemoProps, MyCompanyType, CompanyType } from '../../utils/types';
import CompanyDetail from '../../components/companyDetail';

function EditMemo({
	companyList,
	myCompanyList,
	updateMyCompanyList,
	handleUpdate,
}: EditMemoProps) {
	const { email, id } = useParams();
	const navigate = useNavigate();
	// 対応する会社情報を探す
	const company: CompanyType | undefined = companyList.find(
		(info) => info.id === id
	);
	//対応するメモを探す
	const myCompany: MyCompanyType | undefined = myCompanyList.find(
		(info) => info.id === id && info.email === email
	);

	const [memo, setMemo] = useState<string>(myCompany?.memo || '');

	const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMemo(event.target.value);
	};
	/**
	 *APIにupdateリクエストする
	 */
	const handleUpdateMyCompany = async () => {
		try {
			await fetch(
				process.env.REACT_APP_BASE_URL! +
					`myCompany/updateMyCompany/${email}/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						memo: memo,
					}),
				}
			);
			if (company) {
				alert(`${company.name}のメモを変更しました`);
			}
		} catch (err) {
			alert('更新に失敗しました');
		}
	};

	/**
	 * メモ削除の処理をする
	 */
	const handleDelete = async () => {
		const confirmDelete = window.confirm('本当にメモを削除しますか？');
		if (confirmDelete) {
			try {
				const response = await fetch(
					process.env.REACT_APP_BASE_URL! +
						`myCompany/deleteMyCompany/${email}/${id}`,

					{
						method: 'DELETE',
						headers: {
							authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);

				const jsonResponse = await response.json();
				alert(jsonResponse.message);

				// 削除が成功したら、リストから削除した情報を更新する
				const updatedMyCompanyList = myCompanyList.filter(
					(info) => info.id !== id
				);
				updateMyCompanyList(updatedMyCompanyList);

				// 削除後にリダイレクトするならば以下の行を有効化する
				navigate('/pages/home');
			} catch (err) {
				alert('削除に失敗しました');
			}
		}
		handleUpdate();
	};
	/**
	 *完了ボタンが押されたときの処理を実装する
	 */
	const handleComplete = () => {
		const updatedMyCompanyList = myCompanyList.map((info) => {
			if (info.email === email && info.id === id) {
				return {
					...info,
					memo: memo,
				};
			}
			return info;
		});

		updateMyCompanyList(updatedMyCompanyList);
		handleUpdateMyCompany();

		//handleUpdate();
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
			{company ? <CompanyDetail company={company} /> : null}
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
