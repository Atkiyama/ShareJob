import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutProps } from '../../utils/types';

function Logout({
	user,
	updateUser,
	updateCompanyList,
	updateCompanyInfoList,
}: LogoutProps) {
	const navigate = useNavigate();
	const handleRemoveData = () => {
		localStorage.removeItem('token');
		updateUser({
			name: '',
			email: '',
			companyInfoList: [],
		});
		updateCompanyList([]); // 空の配列でリストを更新
		updateCompanyInfoList([]); // 空の配列でリストを更新
		updateCompanyInfoList([]);
		navigate('/');
		// キーに関連付けられたデータが削除されます
	};
	const handleCancel = () => {
		navigate('/');
	};
	useEffect(() => {
		if (user.email === '') {
			alert('ログインしていません');
			handleCancel();
		}
		document.title = 'ログアウト';
	});

	return (
		<div>
			ログアウトしますか?
			<div>ユーザ名:{user.name}</div>
			<div>email:{user.email}</div>
			<button onClick={handleRemoveData}>はい</button>
			<button onClick={handleCancel}>いいえ</button>
		</div>
	);
}

export default Logout;
