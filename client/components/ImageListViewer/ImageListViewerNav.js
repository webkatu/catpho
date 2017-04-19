import React from 'react';
import AutoLoadButton from './AutoLoadButton.js';
import TagArea from './TagArea.js';

export default class ImageListViewerNav extends React.Component {
	render() {
		return (
			<div className="imageListViewerNav">
				<AutoLoadButton onClick={this.props.handleAutoLoadButtonClick} />
				<TagArea
					tags={this.props.tags}
					shouldDisplayTagsView={this.props.shouldDisplayTagsView}
					isFetchingTags={this.props.isFetchingTags}
					onTagsViewDisplayButtonClick={this.props.handleTagsViewDisplayButtonClick}
					onTagAnchorClick={this.props.handleTagAnchorClick}
				/>
			</div>
		);
	}
}