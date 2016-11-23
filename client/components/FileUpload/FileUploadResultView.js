import React from 'react';

export default class FileUploadResultView extends React.Component {
	render() {
		const text = (this.props.isSuccess)
			? '成功しました。'
			: '失敗しました。';

		return (
			<div className="fileUploadResultView">
				{text}
			</div>
		);
	}
}