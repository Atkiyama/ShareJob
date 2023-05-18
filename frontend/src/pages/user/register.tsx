import { useState, useEffect } from 'react';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await fetch('http://localhost:5000/user/register', {
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
			});

			alert('ユーザを登録しました');
		} catch (err) {
			console.log(err);
			alert(
				'エラーが発生しました \n 恐れ入りますが時間をおいてもう一度ユーザ登録をしてみてください'
			);
		}
	};

	useEffect(() => {
		document.title = '登録ページ';
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
