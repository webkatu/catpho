import React from 'react';
import * as ReactRedux from 'react-redux';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import handleAnchorClick from '../common/handleAnchorClick.js';

class Footer extends React.Component {
	handleHomeAnchorClick(e) {
		handleAnchorClick(e);
		this.props.dispatch(simpleImageListViewerActions.changeLocation());
	}

	render() {
		return (
			<footer id="footer">
				<ul>
					<li><a href="/" onClick={::this.handleHomeAnchorClick}>ホーム</a></li>
					<li><a href="/about/" onClick={handleAnchorClick}>Catphoって?</a></li>
					<li><a href="/terms/" onClick={handleAnchorClick}>利用規約</a></li>
					<li><a href="/contact/" onClick={handleAnchorClick}>お問い合わせ</a></li>
				</ul>
				<p className="copyright"><small>Copyright&copy; 2017 catpho</small></p>
			</footer>
		);
	}
}

export default ReactRedux.connect()(Footer);