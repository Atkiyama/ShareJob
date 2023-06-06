import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="header-container">
			<h1 className="header-title">ShareJob</h1>

			<ul className="header-links">
				<li>
					<Link to="/">トップページ</Link>
				</li>
				<li>
					<Link to="/pages/home">ホーム</Link>
				</li>
				<li>
					<Link to="/pages/user/register">ユーザ登録</Link>
				</li>
				<li>
					<Link to="/pages/user/editUser">ユーザ情報編集</Link>
				</li>
				<li>
					<Link to="/pages/company/companyList">企業登録</Link>
				</li>
				<li>
					<Link to="/pages/user/login">ログイン</Link>
				</li>
				<li>
					<Link to="/pages/user/logout">ログアウト</Link>
				</li>
			</ul>
		</div>
	);
}

export default Header;
