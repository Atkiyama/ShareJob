import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	UserType,
	CompanyInfoType,
	HomeProps,
	CompanyInfoTableType,
} from '../utils/types';
import { CompanyInfo } from '../../../backend/src/model/companyInfo';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

function Home({ user, companyInfoList, companyList }: HomeProps) {
	const navigate = useNavigate();
	const [data, setData] = useState<CompanyInfoTableType[]>([]);

	const columns: ColumnDef<CompanyInfoTableType, any>[] = [
		{
			accessorKey: 'name',
			header: '企業名',
		},
		{
			accessorKey: 'memo',
			header: 'メモ',
		},
	];

	const table = useReactTable<CompanyInfoTableType>({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		if (user.email !== '') {
			document.title = 'ホーム';
			const handleCompanyInfoTable = async () => {
				if (companyList.length > 0) {
					const newData: CompanyInfoTableType[] = [];
					for (let i = 0; i < companyInfoList.length; i++) {
						for (let j = 0; j < companyList.length; j++) {
							if (companyInfoList[i].id === companyList[j].id) {
								const row = {
									name: companyList[j].name,
									memo: companyInfoList[i].memo,
								};
								newData.push(row);
								break;
							}
						}
					}
					setData(newData);
				}
			};
			handleCompanyInfoTable();
		} else {
			alert('ログインしてください');
			navigate('/pages/user/login');
		}
	}, [user.email, companyInfoList, companyList, navigate]);

	return (
		<div>
			<h2>{user.name}様</h2>
			<h3>登録企業</h3>
			{companyInfoList.length}
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
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

export default Home;
