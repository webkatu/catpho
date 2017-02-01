import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import * as actions from '../actions/imageListViewer.js';
import ImageListViewBox from '../components/ImageListViewer/ImageListViewBox.js';
import ImageListViewerNav from '../components/ImageListViewer/ImageListViewerNav.js';
import { createPagerPath } from '../common/index.js'

class ImageListViewer extends React.Component {
	componentWillMount() {
		this._handlePopstate = ::this.handlePopstate;
		this._handleScroll = ::this.handleScroll;
		window.addEventListener('popstate', this._handlePopstate);
		window.addEventListener('scroll', this._handleScroll);
		this.props.dispatch(actions.mount());
		this.props.dispatch(actions.fetchImageList());
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this._handlePopstate);
		window.removeEventListener('scroll', this._handleScroll);
	}

	componentDidUpdate() {
		if(! this.props.imageListViewer.shouldFetchContents) return;
		this.props.dispatch(actions.fetchImageList());
	}

	handlePopstate(e) {
		this.props.dispatch(actions.mount());
	}

	handleScroll(e) {
		const imageListViewer = this.props.imageListViewer;
		if(! imageListViewer.shouldAutoReload) return;
		if(imageListViewer.isLoading) return;
		if(! imageListViewer.hasNextPage) return;
		if(imageListViewer.isDisplayingViewer) return;

		const imageListViewBox = ReactDOM.findDOMNode(this.refs.imageListViewBox);
		const rect = imageListViewBox.getBoundingClientRect();

		//一番下までスクロールされているか
		if(window.innerHeight < rect.bottom) return;

		const currentPage = imageListViewer.pagerInfo.current;

		this.props.dispatch(actions.fetchImageList(
			'/contents' + createPagerPath(currentPage + 1)
		));
	}

	onAutoReloadButtonClick(checked) {
		this.props.dispatch(actions.toggleAutoReload(checked));
	}

	onReloadButtonClick(url) {
		ReactRouter.browserHistory.push(url.pathname + url.search);
	}

	handleImageClick(e) {
		e.preventDefault();
		const imageListViewBox = ReactDOM.findDOMNode(this.refs.imageListViewBox);
		const list = Array.from(imageListViewBox.querySelectorAll('.image'));
		const selectedIndex = list.indexOf(e.currentTarget.parentNode);
		this.props.dispatch(actions.openViewer(this.props.imageListViewer.contents, selectedIndex));
	}

	onPagerItemClick(url) {
		ReactRouter.browserHistory.push(url.pathname + url.search);
		this.props.dispatch(actions.mount());
		this.props.dispatch(actions.fetchImageList());
	}

	render() {
		console.log(this.props)
		const { dispatch, imageListViewer } = this.props;

		return (
			<article className="imageListViewer">
				<ImageListViewerNav onAutoReloadButtonClick={::this.onAutoReloadButtonClick} />
				<ImageListViewBox
					lists={imageListViewer.lists}
					pagerInfo={imageListViewer.pagerInfo}
					error={imageListViewer.error}
					errorObject={imageListViewer.errorObject}
					isLoading={imageListViewer.isLoading}
					onReloadButtonClick={::this.onReloadButtonClick}
					onImageClick={::this.handleImageClick}
					onPagerItemClick={::this.onPagerItemClick}
					ref="imageListViewBox" />
			</article>
		);

	}
}


function mapStateToProps(state) {
	return {
		imageListViewer: state.imageListViewer,
	}
}

export default ReactRedux.connect(mapStateToProps)(ImageListViewer);