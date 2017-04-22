import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class Favorites extends React.Component {
	render() {
		return (
			<article className="favorites">
				<header>
					<h1>お気に入り</h1>
				</header>
				<div>
					<SimpleImageListViewer />
				</div>
			</article>
		);
	}
}

export default ReactRedux.connect()(Favorites);