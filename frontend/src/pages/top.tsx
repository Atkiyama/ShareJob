import { useEffect } from 'react';

/**
 * トップ画面
 * @returns
 */
function Top() {
	useEffect(() => {
		document.title = 'ShareJob';
	}, []);
	return <div>ShareJobトップページ</div>;
}

export default Top;
