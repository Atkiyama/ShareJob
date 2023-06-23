import { Link } from 'react-router-dom';
import { HeaderProps } from '../utils/types';

/**
 * ヘッダを定義
 * @returns
 */
function Header({ user }: HeaderProps) {
	return (
		<div className="header-container">
			<h1 className="header-title">ShareJob</h1>
			<ul className="header-links">
				<li>
					<Link to="/">トップページ</Link>
				</li>
				{user.email !== '' && (
					<li>
						<Link to="/pages/home">ホーム</Link>
					</li>
				)}

				<li>
					<Link to="/pages/user/register">ユーザ登録</Link>
				</li>
				{user.email !== '' && (
					<li>
						<Link to="/pages/user/editUser">ユーザ情報編集</Link>
					</li>
				)}
				{user.email !== '' && (
					<li>
						<Link to="/pages/company/companyList">登録企業</Link>
					</li>
				)}
				{user.email === '' && (
					<li>
						<Link to="/pages/user/login">ログイン</Link>
					</li>
				)}
				{user.email !== '' && (
					<li>
						<Link to="/pages/user/logout">ログアウト</Link>
					</li>
				)}
			</ul>
			{user.email !== '' && <h2>{user.name}さん</h2>}
		</div>
	);
}

export default Header;
