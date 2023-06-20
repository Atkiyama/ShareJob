import { CompanyDetailProps } from '../utils/types';

/**
 * 検索画面から企業の詳細確認できる画面
 * @param param0 企業id
 * @returns
 */
function CompanyDetail({ company }: CompanyDetailProps) {
	if (typeof company !== 'undefined') {
		return (
			<div>
				<h1>{company.name}</h1>
				<h2>概要</h2>
				<div>{company.abstract}</div>
				<h2>業種</h2>
				<div>{company.industries.join(',')}</div>
				<h2>勤務地</h2>
				<div>{company.locations.join(',')}</div>
			</div>
		);
	} else {
		return <div></div>;
	}
}

export default CompanyDetail;
