import React from 'react';

export default class TagArea extends React.Component {
	render() {
		let tagButtonText = 'タグ∨';
		let tagsViewNode = null;
		if(this.props.shouldDisplayTagsView) {
			tagButtonText = 'タグ∧';

			let tagAnchorNodes;
			if(this.props.isFetchingTags) {
				tagAnchorNodes = <span>タグ取得中...</span>
			}else {
				tagAnchorNodes = this.props.tags.map((tag, i) => {
					return (
						<a
							className="tag"
							href={`/contents/?tag=${tag.name}`}
							onClick={this.props.onTagAnchorClick}
							key={i}
						>{tag.name}</a>
					);
				})
			}
			tagsViewNode = (
				<div className="tagsView">
					{tagAnchorNodes}
				</div>
			)
		}

		return (
			<div className="tagArea" onClick={this.props.onTagsViewDisplayButtonClick}>
				<a className="tagButton">{tagButtonText}</a>
				{tagsViewNode}
			</div>
		);
	}
}