import React from 'react';
import * as ReactRedux from 'react-redux';
import ImageListViewer from './ImageListViewer.js';

class Content extends React.Component {
	render() {
		return (
			<div className="contents">
				<ImageListViewer location={this.props.location}/>
			</div>
		);
	}
}

export default ReactRedux.connect()(Content);