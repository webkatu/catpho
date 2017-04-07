import React from 'react';
import AutoReloadButton from './AutoReloadButton.js';
import TagArea from './TagArea.js';

export default class ImageListViewerNav extends React.Component {
	render() {
		return (
			<div className="imageListViewerNav">
				<AutoReloadButton onClick={this.props.handleAutoReloadButtonClick} />
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