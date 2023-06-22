import { useState, useEffect } from 'react';

/**
 * ユーザ登録画面
 * @returns
 */
const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/**
	 *
	 * @param e APIを呼び出してユーザを登録する
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				process.env.REACT_APP_BASE_URL! + `user/register`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: name,
						email: email,
						password: password,
					}),
				}
			);
			const jsonResponse = await response.json();
			alert(jsonResponse.message);
		} catch (err) {
			console.log(err);
			alert(
				'エラーが発生しました \n 恐れ入りますが時間をおいてもう一度ユーザ登録をしてみてください'
			);
		}
	};

	/**
	 * タイトルを更新する
	 */
	useEffect(() => {
		document.title = 'ユーザ登録';
	}, []);

	return (
		<div>
			<h1 className="page-title">ユーザー登録ページ</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					name="name"
					placeholder="名前"
					required
				/>
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
};

export default Register;
