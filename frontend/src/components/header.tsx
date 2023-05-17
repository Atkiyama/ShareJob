import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<div>
			<ul>
				<li>
					<Link to="/">トップ</Link>
				</li>
				<li>
					<Link to="/pages/home"> ホーム</Link>
				</li>
				<li>
					<Link to="/pages/user/register">ユーザ登録</Link>
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
