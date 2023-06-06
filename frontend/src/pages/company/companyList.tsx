import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyListProps, CompanyTableType } from '../../utils/types';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	CellContext,
} from '@tanstack/react-table';

function CompanyList({
	user,
	myCompanyList,
	updateMyCompanyList,
}: CompanyListProps) {
	const navigate = useNavigate();
	const columns: ColumnDef<CompanyTableType, any>[] = [
		{
			accessorKey: 'name',
			header: '',
		},
		{
			accessorKey: 'abstract',
			header: '',
		},
		{
			accessorKey: 'actions',
			header: '', // 空のヘッダーを指定して編集ボタンの列を作成
			cell: (rowContext: CellContext<CompanyTableType, any>) => (
				<button onClick={() => handleOpenEdit(rowContext.row.original)}>
					詳細
				</button>
			),
		},
		// 他のカラムを追加する場合はここに定義します
	];
	const handleOpenEdit = (row: CompanyTableType) => {
		navigate(`/pages/company/companyEdit/${row.id}`);
	};

	const data = myCompanyList;
	const table = useReactTable<CompanyTableType>({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
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
		} else {
			alert('ログインしてください');
			navigate('/pages/user/login');
		}
	}, []);

	return (
		<div>
			<table className="table">
				<thead></thead>
				<tbody>
					{table.getRowModel().rows.map((row, index) => (
						<tr key={index}>
							{row.getVisibleCells().map((cell, index) => (
								<td key={index}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CompanyList;
