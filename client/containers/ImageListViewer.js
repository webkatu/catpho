import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/imageListViewer.js';
import ImageListViewBox from '../components/ImageListViewer/ImageListViewBox.js';
import ImageListViewerNav from '../components/ImageListViewer/ImageListViewerNav.js';
import { createPagerPath } from '../utils/index.js'

class ImageListViewer extends React.Component {
	constructor(props) {
		super(props);
		this.dispatch = this.props.dispatch;
	}

	handleLocationChange() {
		if(! this.props.imageListViewer.isLocationChange) return;

		this.dispatch(actions.init());
		this.dispatch(actions.fetchImageList(
			location.href,
			this.props.imageListViewer.interval,
			this.props.imageListViewer.contentsPath,
			this.props.imageListViewer.imagesPath,
		));
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

		const pagerInfo = imageListViewer.lists[imageListViewer.lists.length - 1].pagerInfo;

		this.dispatch(actions.fetchImageList(
			createPagerPath(pagerInfo.currentPage + 1),
			imageListViewer.interval,
			imageListViewer.contentsPath,
			imageListViewer.imagesPath,
		));
	}

	onAutoReloadButtonClick(checked) {
		this.dispatch(actions.toggleAutoReload(checked));
	}

	componentDidMount() {
		this.handleLocationChange();
		this._handleScroll = this.handleScroll.bind(this);
		window.addEventListener('scroll', this._handleScroll);
	}

	componentDidUpdate() {
		this.handleLocationChange();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._handleScroll);
	}

	render() {
		console.log(this.props)
		const { dispatch, imageListViewer } = this.props;

		return (
			<div className="imageListViewer">
				<ImageListViewerNav onAutoReloadButtonClick={this.onAutoReloadButtonClick.bind(this)} />
				<ImageListViewBox
					lists={imageListViewer.lists}
					error={imageListViewer.error}
					isLoading={imageListViewer.isLoading}
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