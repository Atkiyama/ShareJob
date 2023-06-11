import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EditUserProps, UserType } from '../../utils/types';

/**
 * ユーザ情報を編集する
 * @param param0
 * @returns
 */
function EditUser({
	user,
	updateUser,
	updateCompanyList,
	updateCompanyInfoList,
}: EditUserProps) {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	/**
	 * APIを叩いて情報を更新する
	 * @param e
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:5000/user/updateAll/${user.email}`,
				{
					method: 'PUT',
					headers: {
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
			const updatedUser: UserType = {
				name: name,
				email: email,
			};
			updateUser(updatedUser);
			alert(jsonResponse.message);
		} catch (err) {
			console.log(err);
			alert(
				'エラーが発生しました \n 恐れ入りますが時間をおいてもう一度ユーザ情報の更新をしてみてください'
			);
		}
	};

	/**
	 * ログインしていればuseStateにuserの情報を入れる
	 * ログインしていなければログイン画面に遷移する
	 */
	useEffect(() => {
		if (user.email === '') {
			alert('ログインしていません');
			handleCancel();
		} else {
			setName(user.name);
			setEmail(user.email);
		}
		document.title = 'ユーザ情報編集';
	});

	/**
	 * キャンセルボタンを押した際の処理
	 */
	const handleCancel = () => {
		navigate('/');
	};

	/**
	 * ユーザ削除をした時の処理
	 */
	const handleDelete = async () => {
		const confirmDelete = window.confirm('本当にユーザを削除しますか？');
		if (confirmDelete) {
			const response = await fetch(
				`http://localhost:5000/user/delete/${email}`,
				{
					method: 'DELETE',
				}
			);

			const jsonResponse = await response.json();

			alert(jsonResponse.message);

			// 削除が成功したら、リストから削除した情報を更新する
			if (response.ok) {
				updateCompanyList([]); // 空の配列でリストを更新
				updateCompanyInfoList([]); // 空の配列でリストを更新
				updateUser({ name: '', email: '' }); // 空のユーザ情報で更新

				// 削除後にリダイレクトする場合は以下の行を有効化する
				navigate('/');
			} else {
				alert('通信失敗');
			}
		} else {
			alert('キャンセル');
		}
	};

	return (
		<div>
			<h1 className="page-title">ユーザ情報編集</h1>
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
			<button onClick={handleDelete}>削除</button>
		</div>
	);
}

export default EditUser;
