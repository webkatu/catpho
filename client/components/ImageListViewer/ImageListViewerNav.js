import React from 'react';
import AutoLoadButton from './AutoLoadButton.js';
import TagArea from './TagArea.js';

export default class ImageListViewerNav extends React.Component {
	render() {
		return (
			<ul className="imageListViewerNav">
				<li><AutoLoadButton onClick={this.props.handleAutoLoadButtonClick} /></li>
				<li><TagArea
					tags={this.props.tags}
					shouldDisplayTagsView={this.props.shouldDisplayTagsView}
					isFetchingTags={this.props.isFetchingTags}
					onTagsViewDisplayButtonClick={this.props.handleTagsViewDisplayButtonClick}
					onTagAnchorClick={this.props.handleTagAnchorClick}
				/></li>
			</ul>
		);
	}
}