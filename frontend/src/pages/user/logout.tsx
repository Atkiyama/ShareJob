import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
	const navigate = useNavigate();
	const handleRemoveData = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('token');
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
