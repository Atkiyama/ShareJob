import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	CompanyType,
	CompanyTableType,
	SearchCompanyProps,
} from '../../utils/types';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	CellContext,
} from '@tanstack/react-table';

function SearchCompany({
	searchedCompany,
	updateSearchCompanyList,
}: SearchCompanyProps) {
	const navigate = useNavigate();
	const [word, setWord] = useState<string>('');
	//const [searchedCompany, setSearchedCompany] = useState<CompanyType[]>([]);
	const updateWord = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setWord(event.target.value);
	};
	useEffect(() => {
		document.title = `企業検索`;
	});

	const handleOpenDetail = (row: CompanyTableType) => {
		navigate(`/pages/company/companyDetail/${row.id}`);
	};

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
				<button onClick={() => handleOpenDetail(rowContext.row.original)}>
					詳細
				</button>
			),
		},
		// 他のカラムを追加する場合はここに定義します
	];

	const data = searchedCompany; // 検索結果のデータを使用します

	const handleSearch = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/company/searchCompany/?words=${word}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const jsonResponse = await response.json();
			updateSearchCompanyList(jsonResponse.companyList);
		} catch (err) {
			alert('検索に失敗しました');
		}
	};

	const table = useReactTable<CompanyTableType>({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<h1>企業検索</h1>
			<div>
				<textarea
					className="search-company__textarea"
					value={word}
					onChange={updateWord}
					placeholder="キーワードを入力してください"
				/>
			</div>
			<button className="search-company__button" onClick={handleSearch}>
				検索
			</button>
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
		</div>
	);
}

export default SearchCompany;
