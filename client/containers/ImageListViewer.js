import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import * as actions from '../actions/imageListViewer.js';
import SimpleImageListViewer from './SimpleImageListViewer.js';
import ImageListViewBox from '../components/ImageListViewer/ImageListViewBox.js';
import ImageListViewerNav from '../components/ImageListViewer/ImageListViewerNav.js';
import { createPagerPath } from '../common/index.js'

class ImageListViewer extends React.Component {
	componentWillMount() {
		this._handleScroll = ::this.handleScroll;
		window.addEventListener('scroll', this._handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._handleScroll);
	}

	handleScroll(e) {
		const { imageListViewer, simpleImageListViewer } = this.props;

		if(! imageListViewer.shouldAutoReload) return;
		if(simpleImageListViewer.isFetching) return;
		if(! imageListViewer.hasNextPage) return;
		if(imageListViewer.isDisplayingViewer) return;

		const simpleImageListViewerNode = ReactDOM.findDOMNode(this.refs.simpleImageListViewer);
		const rect = simpleImageListViewerNode.getBoundingClientRect();
		//一番下までスクロールされているか
		if(window.innerHeight < rect.bottom) return;

		this.props.dispatch(actions.fetchContents(
			simpleImageListViewer.basePathOfFetch,
			simpleImageListViewer.pagerInfo.current + 1
		));
	}

	onAutoReloadButtonClick(checked) {
		this.props.dispatch(actions.toggleAutoReload(checked));
	}

	render() {
		return (
			<article className="imageListViewer">
				<ImageListViewerNav onAutoReloadButtonClick={::this.onAutoReloadButtonClick} />
				<SimpleImageListViewer
					basePathOfFetch='/contents'
					ref="simpleImageListViewer"
				/>
			</article>
		);
	}
}


function mapStateToProps(state) {
	return {
		imageListViewer: state.imageListViewer,
		simpleImageListViewer: state.simpleImageListViewer,
	}
}

export default ReactRedux.connect(mapStateToProps)(ImageListViewer);