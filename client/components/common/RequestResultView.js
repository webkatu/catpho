import React from 'react';

export default function RequestResultView(props) {
	const text = (props.isSuccess)
		? '成功しました。'
		: '失敗しました。';

	return (
		<div className="requestResultView">
			{text}
		</div>
	);
}