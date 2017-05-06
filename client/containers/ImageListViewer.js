import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/imageListViewer.js';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import SimpleImageListViewer from './SimpleImageListViewer.js';
import ImageListViewerNav from '../components/ImageListViewer/ImageListViewerNav.js';
import handleAnchorClick from '../common/handleAnchorClick.js';

class ImageListViewer extends React.Component {
	componentWillMount() {
		this._handleScroll = ::this.handleScroll;
		window.addEventListener('scroll', this._handleScroll);
		this.props.dispatch(actions.fetchTags());
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._handleScroll);
	}

	handleScroll(e) {
		const { imageListViewer, simpleImageListViewer } = this.props;

		if(! imageListViewer.shouldAutoLoad) return;
		if(simpleImageListViewer.isFetching) return;
		if(! imageListViewer.hasNextPage) return;
		if(simpleImageListViewer.shouldDisplayContentViewer) return;

		const simpleImageListViewerNode = ReactDOM.findDOMNode(this.refs.simpleImageListViewer);
		const rect = simpleImageListViewerNode.getBoundingClientRect();
		//一番下までスクロールされているか (-1はedgeのバグ対策)
		if(window.innerHeight < rect.bottom - 1) return;

		this.props.dispatch(simpleImageListViewerActions.fetchContents(
			simpleImageListViewer.basePathOfFetch,
			simpleImageListViewer.pagerInfo.current + 1
		));
	}

	handleAutoLoadButtonClick(e) {
		this.props.dispatch(actions.toggleAutoLoad());
	}

	handleTagsViewDisplayButtonClick(e) {
		this.props.dispatch(actions.toggleTagsView());
	}

	handleTagAnchorClick(e) {
		handleAnchorClick(e);
		this.props.dispatch(simpleImageListViewerActions.changeLocation());
	}

	render() {
		const imageListViewer = this.props.imageListViewer;
		return (
			<div className="imageListViewer">
				<ImageListViewerNav
					tags={this.props.tags}
					shouldDisplayTagsView={imageListViewer.shouldDisplayTagsView}
					isFetchingTags={imageListViewer.isFetchingTags}
					handleAutoLoadButtonClick={::this.handleAutoLoadButtonClick} 
					handleTagsViewDisplayButtonClick={::this.handleTagsViewDisplayButtonClick}
					handleTagAnchorClick={::this.handleTagAnchorClick}
				/>
				<SimpleImageListViewer ref="simpleImageListViewer" />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		imageListViewer: state.imageListViewer,
		simpleImageListViewer: state.simpleImageListViewer,
		tags: state.tags.tags,
	}
}

export default ReactRedux.connect(mapStateToProps)(ImageListViewer);