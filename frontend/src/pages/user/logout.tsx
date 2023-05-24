import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutProps } from '../../utils/types';

function Logout({ user, updateUser }: LogoutProps) {
	const navigate = useNavigate();
	const handleRemoveData = () => {
		localStorage.removeItem('token');
		updateUser({
			name: '',
			email: '',
			companyInfoList: [],
		});
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
