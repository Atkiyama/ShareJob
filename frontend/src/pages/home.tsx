import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType, CompanyInfoType, HomeProps } from '../utils/types';
import { CompanyInfo } from '../../../backend/src/model/companyInfo';

function Home({ user, companyInfoList }: HomeProps) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user.email !== '') {
			document.title = 'ホーム';
		} else {
			alert('ログインしてください');
			navigate('/pages/user/login');
		}
	});
	return (
		<div>
			<h2>{user.name}様</h2>
			<h3>登録企業</h3>
			{companyInfoList.map((companyInfo, index) => (
				<div>
					{}
					{}
				</div>
			))}
		</div>
	);
}

export default Home;
