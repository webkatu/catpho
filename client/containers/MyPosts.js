import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class MyPosts extends React.Component {
	render() {
		return (
			<article className="myPosts">
				<header>
					<h1>投稿した画像</h1>
				</header>
				<div>
					<SimpleImageListViewer />
				</div>
			</article>
		);
	}
}

export default ReactRedux.connect()(MyPosts);