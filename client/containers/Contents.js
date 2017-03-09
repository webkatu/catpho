import React from 'react';
import * as ReactRedux from 'react-redux';
import ImageListViewer from './ImageListViewer.js';

class Content extends React.Component {
	render() {
		return (
			<div className="contents">
				<ImageListViewer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default ReactRedux.connect(mapStateToProps)(Content);