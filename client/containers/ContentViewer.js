import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/content.js';
import CatContent from './CatContent.js';
import NavigationButton from '../components/ContentViewer/NavigationButton.js';
import handleAnchorClick from '../common/handleAnchorClick.js';

class ContentViewer extends React.Component {
	componentWillMount() {
		this._handlePopstate = ::this.handlePopstate;
		window.addEventListener('popstate', this._handlePopstate);
		this.props.dispatch(actions.changeLocation());
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this._handlePopstate);
	}

	componentDidUpdate() {
		if(this.props.contentViewer.shouldFetchContent) {
			const contentId = location.pathname.match('/contents/(.+)')[1];
			this.props.dispatch(actions.fetchContent(contentId));
		}
	}

	handlePopstate(e) {
		this.props.dispatch(actions.changeLocation())
	}

	handleNavigationButtonClick(e) {
		handleAnchorClick(e);
		this.props.dispatch(actions.changeLocation());
	}

	render() {
		return (
			<div className="contentViewer">
				<CatContent />
				<NavigationButton
					contentId={this.props.contentViewer.nextId}
					onClick={::this.handleNavigationButtonClick}
				>&lt;</NavigationButton>
				<NavigationButton
					contentId={this.props.contentViewer.prevId}
					onClick={::this.handleNavigationButtonClick}
				>&gt;</NavigationButton>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		contentViewer: state.contentViewer,
	};
}

export default ReactRedux.connect(mapStateToProps)(ContentViewer);