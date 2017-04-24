import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/simpleContentViewer.js';
import * as contentActions from '../actions/content.js';
import CatContent from './CatContent.js';
import NavigationButton from '../components/ContentViewer/NavigationButton.js'

class SimpleContentViewer extends React.Component {
	componentWillMount() {
		this.props.dispatch(contentActions.fetchContent(this.props.simpleContentViewer.contentIds[this.props.simpleContentViewer.selectedIndex]));
	}

	handleCloseButtonClick() {
		this.props.dispatch(actions.closeViewer());
	}

	handlePreviousButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.goPrevious());
		this.props.dispatch(contentActions.fetchContent(this.props.simpleContentViewer.previousId));

	}

	handleNextButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.goNext());
		this.props.dispatch(contentActions.fetchContent(this.props.simpleContentViewer.nextId));
	}

	render() {
		const simpleContentViewer = this.props.simpleContentViewer;
		return (
			<div className="simpleContentViewer">
				<div
					className="closeArea"
					onClick={::this.handleCloseButtonClick}
				/>
				<div className="wrapper">
					<button
						className="closeButton"
						type="button"
						onClick={::this.handleCloseButtonClick}
					>×</button>
					<CatContent />
					<NavigationButton
						contentId={simpleContentViewer.previousId}
						onClick={::this.handlePreviousButtonClick}
					>&lt;</NavigationButton>
					<NavigationButton
						contentId={simpleContentViewer.nextId}
						onClick={::this.handleNextButtonClick}
					>&gt;</NavigationButton>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		simpleContentViewer: state.simpleContentViewer,
	};
}

export default ReactRedux.connect(mapStateToProps)(SimpleContentViewer);