import { useEffect } from 'react';

/**
 * トップ画面
 * @returns
 */
function Top() {
	useEffect(() => {
		document.title = 'ShareJob';
	}, []);

	return (
		<div>
			<h1>shareJobへようこそ!</h1>
			本サイトでは主に以下のことができます
			<ul>
				<li>就職活動の状況の登録、管理</li>
				{/* <li>項目2</li> */}
			</ul>
			<h2>就職活動の状況の登録、管理</h2>
			<h3>登録方法</h3>
			<p>各企業に対する就職活動の状況をメモとして登録することができます。</p>
			<p>
				ホーム画面の右下の+ボタンを押すと企業検索画面に移るのでそこから企業をMy企業に登録して選考状況を登録できます。
			</p>
			<img
				src={require('../image/homeExample.png')}
				alt=""
				style={{ width: '600px', height: '350px' }}
			/>
			<h3>企業情報の登録</h3>
			<p>検索に企業がヒットしない場合、自分で登録することもできます</p>
			<p>
				ヘッダーから登録企業を選択すると自分が今までサイトに登録した企業を閲覧できます
			</p>
			<p>
				右下の+ボタンから新規登録ができるので是非企業情報の登録にご協力ください！
			</p>
			<img
				src={require('../image/ListExample.png')}
				alt=""
				style={{ width: '600px', height: '350px' }}
			/>
		</div>
	);
}

export default Top;
