import React from 'react';
import { useEffect } from 'react';

function Top() {
	useEffect(() => {
		document.title = 'ShareJob';
	}, []);
	return <div>ShareJobトップページ</div>;
}

export default Top;
