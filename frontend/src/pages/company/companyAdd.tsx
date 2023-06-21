import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CompanyAddProps, CompanyType } from '../../utils/types';
import CompanyDetail from '../../components/companyDetail';

function CompanyAdd({
	user,
	searchedCompanyList,
	handleUpdate,
}: CompanyAddProps) {
	const { id } = useParams();
	const navigate = useNavigate();
	// 対応する会社情報を探す
	const company: CompanyType | undefined = searchedCompanyList.find(
		(info) => info.id === id
	);

	const handleRegister = async () => {
		try {
			await fetch(
				process.env.REACT_APP_BASE_URL! + `myCompany/registerMyCompany`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						email: user.email,
						id: id,
						memo: '',
					}),
				}
			);

			if (company) {
				alert(company.name + 'を登録しました');
			}
			handleUpdate();
		} catch (err) {
			alert('登録に失敗しました');
		}
	};

	/**
	 *完了ボタンが押されたときの処理を実装する
	 */
	const handleComplete = () => {
		handleRegister();
		navigate('/pages/home');
	};

	const handleReturn = () => {
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

			<button onClick={handleComplete}>追加</button>
			<button onClick={handleReturn}>戻る</button>
		</div>
	);
}

export default CompanyAdd;
