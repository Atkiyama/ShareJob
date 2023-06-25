import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeProps, MyCompanyTableType } from '../utils/types';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	CellContext,
} from '@tanstack/react-table';

/**
 * ホーム画面
 * @param param0
 * @returns
 */
function Home({ user, myCompanyList, companyList }: HomeProps) {
	const navigate = useNavigate();
	const [data, setData] = useState<MyCompanyTableType[]>([]);
	/**
	 * テーブルのヘッダを定義する
	 */
	const columns: ColumnDef<MyCompanyTableType, any>[] = [
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
			cell: (rowContext: CellContext<MyCompanyTableType, any>) => (
				<button onClick={() => handleEdit(rowContext.row.original)}>
					編集
				</button>
			),
		},
	];

	/**
	 * ReactTableを定義する
	 */
	const table = useReactTable<MyCompanyTableType>({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	/**
	 * companyInfoからcompanyInfoTableの情報を取得する
	 */
	useEffect(() => {
		if (user) {
			document.title = 'ホーム';
			const handleCompanyInfoTable = async () => {
				if (companyList.length > 0) {
					const newData: MyCompanyTableType[] = [];
					for (let i = 0; i < myCompanyList.length; i++) {
						for (let j = 0; j < companyList.length; j++) {
							if (myCompanyList[i].id === companyList[j].id) {
								const row = {
									id: myCompanyList[i].id, // idを追加
									email: myCompanyList[i].email, // emailを追加
									name: companyList[j].name,
									memo: myCompanyList[i].memo,
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
	}, [myCompanyList, companyList]);

	/**
	 * 編集画面に遷移する
	 * @param row emailとidが含まれる
	 */
	const handleEdit = (row: MyCompanyTableType) => {
		// 編集処理を実装する
		navigate(`/pages/myCompany/myCompany/${row.email}/${row.id}`);
	};

	/**
	 * 検索画面に遷移する
	 */
	const handleSearch = () => {
		navigate('/pages/company/searchCompany');
	};

	return (
		<div>
			<h3>My企業</h3>

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
				企業の検索、追加 →{' '}
				<button className="large-button" onClick={handleSearch}>
					+
				</button>
			</div>
		</div>
	);
}

export default Home;
