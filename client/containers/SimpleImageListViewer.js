import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/simpleImageListViewer.js';
import SimpleContentViewer from './SimpleContentViewer.js';
import ImageList from '../components/ImageListViewer/ImageList.js';
import LoadingEffect from '../components/ImageListViewer/LoadingEffect.js';

class SimpleImageListViewer extends React.Component {
	componentWillMount() {
		this._handlePopstate = ::this.handlePopstate
		window.addEventListener('popstate', this._handlePopstate);
		this.props.dispatch(actions.mount(this.props.basePathOfFetch));
		this.props.dispatch(actions.clear());
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this._handlePopstate);
	}

	componentDidUpdate() {
		if(this.props.simpleImageListViewer.shouldFetchContents) {
			this.props.dispatch(actions.fetchContents(this.props.simpleImageListViewer.basePathOfFetch));
		}
	}

	handlePopstate(e) {
		this.props.dispatch(actions.clear());
	}

	handleImageClick(e) {
		e.preventDefault();
		const simpleImageListViewer = ReactDOM.findDOMNode(this.refs.simpleImageListViewer);
		const list = Array.from(simpleImageListViewer.querySelectorAll('.image'));
		const selectedIndex = list.indexOf(e.currentTarget.parentNode);
		this.props.dispatch(actions.openViewer(this.props.simpleImageListViewer.contents, selectedIndex));
	}

	handlePagerItemClick(e) {
		e.preventDefault();
		const url = e.target;
		this.context.router.push({
			pathname: url.pathname,
			search: url.search,
		});
		this.props.dispatch(actions.clear());
	}

	render() {
		const simpleImageListViewer = this.props.simpleImageListViewer;
		const imageListNodes = simpleImageListViewer.lists.map((list, i) => {
			return (
				<ImageList
					contents={list}
					pagerInfo={simpleImageListViewer.pagerInfo}
					page={this.props.simpleImageListViewer.pagerInfo.start + i}
					handleImageClick={::this.handleImageClick}
					handlePagerItemClick={::this.handlePagerItemClick}
					key={i}
				/>

			);
		});

		const loadingEffect = simpleImageListViewer.isFetching
			? <LoadingEffect />
			: null;

		const simpleContentViewerNode = (
			(simpleImageListViewer.shouldDisplayContentViewer)
			? <SimpleContentViewer />
			: null
		);

		return (
			<div className="simpleImageListViewer" ref="simpleImageListViewer">
				{imageListNodes}
				{loadingEffect}
				{simpleContentViewerNode}
			</div>
		);
	}

	static propTypes = {
		basePathOfFetch: React.PropTypes.string.isRequired,
	};

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		simpleImageListViewer: state.simpleImageListViewer,
	};
}

export default ReactRedux.connect(mapStateToProps)(SimpleImageListViewer);