import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class MyPosts extends React.Component {
	render() {
		return (
			<article className="myPosts">
				<h1>投稿した画像</h1>
				<SimpleImageListViewer basePathOfFetch={`/contents/?poster=${this.props.user.userName}`} />
			</article>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default ReactRedux.connect(mapStateToProps)(MyPosts);