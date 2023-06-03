import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeProps, CompanyInfoTableType } from '../utils/types';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	CellContext,
} from '@tanstack/react-table';

function Home({
	user,
	companyInfoList,
	companyList,
	updateCompanyList,
}: HomeProps) {
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
		{
			accessorKey: 'actions',
			header: '', // 空のヘッダーを指定して編集ボタンの列を作成
			cell: (rowContext: CellContext<CompanyInfoTableType, any>) => (
				<button onClick={() => handleEdit(rowContext.row.original)}>
					編集
				</button>
			),
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
									id: companyInfoList[i].id, // idを追加
									email: companyInfoList[i].email, // emailを追加
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
	}, [companyInfoList, companyList]);

	const handleEdit = (row: CompanyInfoTableType) => {
		// 編集処理を実装する
		navigate(`/pages/companyInfo/companyInfo/${row.email}/${row.id}`);
	};

	const handleSearch = () => {
		navigate('/pages/company/searchCompany');
	};

	return (
		<div>
			<h2>{user.name}様</h2>
			<h3>登録企業</h3>

			<table className="table">
				<thead>
					{table.getHeaderGroups().map((headerGroup, index) => (
						<tr key={index}>
							{headerGroup.headers.map((header, index) => (
								<th key={index}>
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
			<div className="position-fixed">
				<button className="large-button" onClick={handleSearch}>
					+
				</button>
			</div>
		</div>
	);
}

export default Home;
