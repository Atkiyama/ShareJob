import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../../utils/types';

/**
 *	ログイン画面
 * @param param0
 * @returns
 */
function Login({
	handleMyCompanyList,
	handleCompanyList,
	updateUser,
}: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	/**
	 *APIを呼び出してログイン処理を行う
	 * @param e
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(process.env.REACT_APP_BASE_URL);
		try {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL! + `user/login`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				}
			);
			const jsonResponse = await response.json();
			const name = jsonResponse.name;

			/**
			 * 同期処理を行う
			 */
			await Promise.all([
				updateUser({
					name: name,
					email: email,
				}),
				handleMyCompanyList(),
				handleCompanyList(),
				alert(name + 'でログインしました'),
			]);
			localStorage.setItem('token', jsonResponse.token);
			navigate('/pages/home');
		} catch (err) {
			alert('ログインに失敗しました');
		}
	};

	/**
	 * タイトルを更新する
	 */
	useEffect(() => {
		document.title = 'ログイン';
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
				<button>ログイン</button>
			</form>
		</div>
	);
}

export default Login;
