import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/content.js';
import CatContent from './CatContent.js';
import NavigationButton from '../components/ContentViewer/NavigationButton.js';

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

	handlePreviousButtonClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname);
		this.props.dispatch(actions.changeLocation());
	}

	handleNextButtonClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname);
		this.props.dispatch(actions.changeLocation());
	}

	render() {
		return (
			<div className="contentViewer">
				<CatContent />
				<NavigationButton
					contentId={this.props.content.prevId}
					onClick={::this.handlePreviousButtonClick}
				>&lt;</NavigationButton>
				<NavigationButton
					contentId={this.props.content.nextId}
					onClick={::this.handleNextButtonClick}
				>&gt;</NavigationButton>
			</div>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		contentViewer: state.contentViewer,
		content: state.catContent.content,
	};
}

export default ReactRedux.connect(mapStateToProps)(ContentViewer);