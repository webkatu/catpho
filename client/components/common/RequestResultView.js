import React from 'react';

export default function RequestResultView(props) {
	let text = null;

	switch(props.isSuccess) {
		case true:
			text = '成功しました';
			break;
		case false:
			text = '失敗しました';
			break;
	}

	return (
		<div className="requestResultView">
			{text}
		</div>
	);
}