import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../../utils/types';

function Logout({ updateUser }: LoginProps) {
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
		document.title = 'ログアウト';
	}, []);
	return (
		<div>
			ログアウトしますか?
			<button onClick={handleRemoveData}>はい</button>
			<button onClick={handleCancel}>いいえ</button>
		</div>
	);
}

export default Logout;
