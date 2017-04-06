import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class MyPosts extends React.Component {
	render() {
		return (
			<article className="myPosts">
				<h1>投稿した画像</h1>
				<SimpleImageListViewer />
			</article>
		);
	}
}

export default ReactRedux.connect()(MyPosts);