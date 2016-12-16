import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRouter from 'react-router';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/imageListViewer.js';
import ImageListViewBox from '../components/ImageListViewer/ImageListViewBox.js';
import ImageListViewerNav from '../components/ImageListViewer/ImageListViewerNav.js';
import { createPagerPath } from '../common/index.js'

class ImageListViewer extends React.Component {
	componentWillMount() {
		this._handleScroll = ::this.handleScroll;
		window.addEventListener('scroll', this._handleScroll);
		this.props.dispatch(actions.fetchImageList());
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._handleScroll);
		this.props.dispatch(actions.init());
	}

	handleScroll(e) {
		const imageListViewer = this.props.imageListViewer;
		if(! imageListViewer.shouldAutoReload) return;
		if(imageListViewer.isLoading) return;
		if(! imageListViewer.hasNextPage) return;

		const imageListViewBox = ReactDOM.findDOMNode(this.refs.imageListViewBox);
		const rect = imageListViewBox.getBoundingClientRect();

		//一番下までスクロールされているか
		if(window.innerHeight < rect.bottom) return;

		const currentPage = imageListViewer.lists[imageListViewer.lists.length - 1].pagerInfo.currentPage;

		this.props.dispatch(actions.fetchImageList(
			createPagerPath(currentPage + 1)
		));
	}

	onAutoReloadButtonClick(checked) {
		this.props.dispatch(actions.toggleAutoReload(checked));
	}

	onReloadButtonClick(url) {
		ReactRouter.browserHistory.push(url.pathname + url.search);
		this.props.dispatch(actions.fetchImageList());
	}

	onPagerItemClick(url) {
		ReactRouter.browserHistory.push(url.pathname + url.search);
		this.props.dispatch(actions.init());
		this.props.dispatch(actions.fetchImageList());
	}

	render() {
		console.log(this.props)
		const { dispatch, imageListViewer } = this.props;

		return (
			<div className="imageListViewer">
				<ImageListViewerNav onAutoReloadButtonClick={::this.onAutoReloadButtonClick} />
				<ImageListViewBox
					lists={imageListViewer.lists}
					error={imageListViewer.error}
					errorObject={imageListViewer.errorObject}
					isLoading={imageListViewer.isLoading}
					onReloadButtonClick={::this.onReloadButtonClick}
					onPagerItemClick={::this.onPagerItemClick}
					ref="imageListViewBox" />
			</div>
		);

	}
}


function mapStateToProps(state) {
	return {
		imageListViewer: state.imageListViewer,
	}
}

export default ReactRedux.connect(mapStateToProps)(ImageListViewer);