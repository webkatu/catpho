import React from 'react';
import * as ReactRedux from 'react-redux';
import ImageListViewer from './ImageListViewer.js';
import SimpleContentViewer from './SimpleContentViewer.js';

class Content extends React.Component {
	render() {
		console.log(this.props.contents.shouldDisplayViewer);
		const simpleContentViewerNode = (
			(this.props.contents.shouldDisplayViewer)
			? <SimpleContentViewer />
			: null
		);

		return (
			<div className="contents">
				<ImageListViewer />
				{simpleContentViewerNode}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		contents: state.contents,
	};
}

export default ReactRedux.connect(mapStateToProps)(Content);