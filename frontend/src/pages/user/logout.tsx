import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutProps } from '../../utils/types';

/**
 * ログアウト画面
 * @param param0
 * @returns
 */
function Logout({ user, updateCompanyList, updateMyCompanyList }: LogoutProps) {
	const navigate = useNavigate();
	/**
	 *ログアウト処理を行う
	 */
	const handleRemoveData = () => {
		localStorage.removeItem('token');
		updateCompanyList([]); // 空の配列でリストを更新
		updateMyCompanyList([]); // 空の配列でリストを更新

		navigate('/');
		// キーに関連付けられたデータが削除されます
	};

	/**
	 * トップ画面に戻る
	 */
	const handleCancel = () => {
		navigate('/');
	};

	/**
	 *ログインしているか判定し、ログインしていなければトップに戻る
	 */
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
