import React from 'react';
import * as ReactRedux from 'react-redux';
import ImageListViewer from './ImageListViewer.js';

class Content extends React.Component {
	render() {
		return (
			<article className="contents">
				<h1>コンテンツ</h1>
				<ImageListViewer />
			</article>
		);
	}
}

export default ReactRedux.connect()(Content);