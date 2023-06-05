import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyListProps } from '../../utils/types';

function CompanyDetail({
	user,
	myCompanyList,
	updateMyCompanyList,
}: CompanyListProps) {
	const navigate = useNavigate();
	const handleMyCompanyList = async () => {
		const response = await fetch(
			`http://localhost:5000/company/getMyCompanyList?email=${user.email}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		const jsonResponse = await response.json();
		updateMyCompanyList(jsonResponse.companyList);
	};
	useEffect(() => {
		document.title = `登録企業一覧`;
		if (user) {
			handleMyCompanyList();
		}
	});
	if (user) {
		return;
	} else {
		alert('ログインしてください');
		navigate('/pages/user/login');
	}
}

export default CompanyDetail;
