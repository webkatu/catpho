import React from 'react';
import ImageList from './ImageList.js';
import LoadingEffect from './LoadingEffect.js';
import RequestError from './RequestError.js';

export default class ImageListViewBox extends React.Component {

	render() {
		const imageListNodes = this.props.lists.map((list, i) => {
			return (
				<ImageList images={list.images} pagerInfo={list.pagerInfo} key={i} />
			);
		});

		const requestError = this.props.error
			? <RequestError error={this.props.error} />
			: null;

		const loadingEffect = this.props.isLoading
			? <LoadingEffect />
			: null;

		return (
			<div className="imageListViewBox">
				{imageListNodes}
				{requestError}
				{loadingEffect}
			</div>
		);
	}
}