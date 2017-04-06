import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class MyComments extends React.Component {
	render() {
		return (
			<article className="myComments">
				<h1>コメントした画像</h1>
				<SimpleImageListViewer />
			</article>
		);
	}
}

export default ReactRedux.connect()(MyComments);