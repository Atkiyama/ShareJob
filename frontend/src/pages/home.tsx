import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../utils/types';

function Home({ user }: { user: UserType }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user.email !== '') {
			document.title = 'ホーム';
			for (const companyId of user.companyInfoList) {
			}
		} else {
			alert('ログインしてください');
			navigate('/pages/user/login');
		}
	});
	return (
		<div>
			<h2>{user.name}様</h2>
			<h3>登録企業</h3>
		</div>
	);
}

export default Home;
