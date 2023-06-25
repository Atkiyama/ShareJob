import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyListProps, CompanyTableType } from '../../utils/types';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	CellContext,
} from '@tanstack/react-table';

/**
 * 自分で登録した企業リストを表示する
 * @param param0
 * @returns
 */
function CompanyList({
	user,
	registerCompanyList,
	updateRegisterCompanyList,
}: CompanyListProps) {
	const navigate = useNavigate();
	/**
	 * 表のヘッダを定義
	 */
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

	/**
	 * 企業編集画面を開く
	 * @param row idを格納する
	 */
	const handleOpenEdit = (row: CompanyTableType) => {
		navigate(`/pages/company/companyEdit/${row.id}`);
	};

	const data = registerCompanyList;
	/**
	 * reactテーブルを定義
	 */
	const table = useReactTable<CompanyTableType>({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	/**
	 * 自分が登録した企業をバックエンドから取得する
	 */
	const handleMyCompanyList = async () => {
		const response = await fetch(
			process.env.REACT_APP_BASE_URL! +
				`company/getRegisterCompanyList?email=${user.email}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
		const jsonResponse = await response.json();
		updateRegisterCompanyList(jsonResponse.companyList);
	};
	const handleAdd = async () => {
		navigate(`/pages/company/companyRegister/`);
	};

	/**
	 *ログイン状態によって処理を分岐する
	 */
	useEffect(() => {
		document.title = `登録企業一覧`;
		if (user.email !== '') {
			handleMyCompanyList();
		} else {
			alert('ログインしてください');
			navigate('/pages/user/login');
		}
	}, []);
	if (typeof data !== 'undefined') {
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
				<div className="position-fixed">
					企業の追加登録 →{' '}
					<button className="large-button" onClick={handleAdd}>
						+
					</button>
				</div>
			</div>
		);
	} else {
		const handleError = () => {
			handleMyCompanyList();
		};
		handleError();
		return <div></div>;
	}
}

export default CompanyList;
