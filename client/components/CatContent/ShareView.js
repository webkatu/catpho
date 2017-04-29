import React from 'react';
import ReactDOM from 'react-dom';
import handleAnchorClick from '../../common/handleAnchorClick.js';

export default class ShareView extends React.Component {
	handleShareUrlCopyButtonClick(e) {
		const range = document.createRange();
		const referenceNode = ReactDOM.findDOMNode(this.refs.shareUrl);
		range.selectNode(referenceNode);
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand('copy');
		range.detach();

		this.props.onShareUrlCopyButtonClick(e);
	}

	render() {
		return (
			<aside className="shareView">
				<p>URL: <a href={this.props.url} onClick={handleAnchorClick} ref="shareUrl">{this.props.url}</a><button className="shareUrlCopyButton" type="button" onClick={::this.handleShareUrlCopyButtonClick}>コピー</button></p>
				<ul className="shareButtons">
					<li>
						<a href={`https://twitter.com/share?url=${this.props.url}`} target="_blank"><img src="/img/icons/twitter.png" /></a>
					</li>
					<li>
						<a href={`https://www.facebook.com/sharer/sharer.php?u=${this.props.url}`} target="_blank"><img src="/img/icons/facebook.png" /></a>
					</li>
				</ul>
			</aside>
		);
	}
}