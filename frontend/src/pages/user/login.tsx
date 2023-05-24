import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../../utils/types';

function Login({
	handleCompanyInfoList,
	handleCompanyList,
	updateUser,
}: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/user/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			const jsonResponse = await response.json();
			localStorage.setItem('token', jsonResponse.token);

			await Promise.all([
				updateUser({
					name: jsonResponse.savedUserData.name,
					email: jsonResponse.savedUserData.email,
					companyInfoList: jsonResponse.savedUserData.companyInfoList,
				}),
				handleCompanyInfoList(),
				handleCompanyList(),
				alert(
					'ログインに成功しました' +
						'\n email:' +
						jsonResponse.savedUserData.email +
						'\n password:' +
						jsonResponse.savedUserData.password
				),
			]);
			navigate('/pages/home');
		} catch (err) {
			alert('ログインに失敗しました');
		}
	};
	useEffect(() => {
		document.title = 'ログインページ';
	}, []);

	return (
		<div>
			<h1> ログイン</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					name="email"
					placeholder="メールアドレス"
					required
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="text"
					name="password"
					placeholder="パスワード"
					required
				/>
				<button>登録</button>
			</form>
		</div>
	);
}

export default Login;
