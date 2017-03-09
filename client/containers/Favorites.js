import React from 'react';
import * as ReactRedux from 'react-redux';
import SimpleImageListViewer from './SimpleImageListViewer.js';

class Favorites extends React.Component {
	render() {
		return (
			<article className="favorites">
				<h1>お気に入り</h1>
				<SimpleImageListViewer basePathOfFetch={`/contents/?favoritesOf=${this.props.user.userName}&userToken=${localStorage.getItem('userToken')}`} />
			</article>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default ReactRedux.connect(mapStateToProps)(Favorites);