import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import * as actions from '../actions/imageListViewer.js';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import SimpleImageListViewer from './SimpleImageListViewer.js';
import ImageListViewBox from '../components/ImageListViewer/ImageListViewBox.js';
import ImageListViewerNav from '../components/ImageListViewer/ImageListViewerNav.js';

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

		if(! imageListViewer.shouldAutoReload) return;
		if(simpleImageListViewer.isFetching) return;
		if(! imageListViewer.hasNextPage) return;
		if(simpleImageListViewer.shouldDisplayContentViewer) return;

		const simpleImageListViewerNode = ReactDOM.findDOMNode(this.refs.simpleImageListViewer);
		const rect = simpleImageListViewerNode.getBoundingClientRect();
		//一番下までスクロールされているか
		if(window.innerHeight < rect.bottom) return;

		this.props.dispatch(simpleImageListViewerActions.fetchContents(
			simpleImageListViewer.basePathOfFetch,
			simpleImageListViewer.pagerInfo.current + 1
		));
	}

	handleAutoReloadButtonClick(checked) {
		this.props.dispatch(actions.toggleAutoReload(checked));
	}

	handleTagsViewDisplayButtonClick(e) {
		this.props.dispatch(actions.toggleTagsView());
	}

	handleTagAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
		this.props.dispatch(simpleImageListViewerActions.changeLocation());
	}

	render() {
		const imageListViewer = this.props.imageListViewer;
		return (
			<article className="imageListViewer">
				<ImageListViewerNav
					tags={this.props.tags}
					shouldDisplayTagsView={imageListViewer.shouldDisplayTagsView}
					isFetchingTags={imageListViewer.isFetchingTags}
					handleAutoReloadButtonClick={::this.handleAutoReloadButtonClick} 
					handleTagsViewDisplayButtonClick={::this.handleTagsViewDisplayButtonClick}
					handleTagAnchorClick={::this.handleTagAnchorClick}
				/>
				<SimpleImageListViewer ref="simpleImageListViewer" />
			</article>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}


function mapStateToProps(state) {
	return {
		imageListViewer: state.imageListViewer,
		simpleImageListViewer: state.simpleImageListViewer,
		tags: state.tags.tags,
	}
}

export default ReactRedux.connect(mapStateToProps)(ImageListViewer);