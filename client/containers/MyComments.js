import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class MyComments extends React.Component {
	render() {
		return (
			<article className="myComments">
				<h1>コメントした画像</h1>
				<SimpleImageListViewer basePathOfFetch={`/contents/?includingCommentsOf=${this.props.user.userName}`} />
			</article>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default ReactRedux.connect(mapStateToProps)(MyComments);