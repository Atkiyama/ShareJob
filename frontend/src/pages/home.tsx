import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('email')) {
			document.title = 'ホーム';
		} else {
			alert('ログインしてください');
			navigate('/pages/user/login');
		}
	}, []);
	return <div>{localStorage.getItem('email')}</div>;
}

export default Home;
