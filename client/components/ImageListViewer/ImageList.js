import React from 'react';
import Image from './Image.js';
import Pager from './Pager.js';
import ImagesNotFound from './ImagesNotFound.js';

export default class ImageList extends React.Component {
	render() {
		if(this.props.contents.length === 0) {
			return (
				<div className="imageList">
					<ImagesNotFound />
				</div>
			);
		}

		const imageNodes = this.props.contents.map((content, i) => {
			return (
				<Image
					id={content.id}
					href={content.href}
					src={content.src}
					onClick={this.props.handleImageClick}
					key={i}
				/>
			);
		});

		return (
			<div className="imageList">
				<div className="images">{imageNodes}</div>
				<Pager
					pagerInfo={this.props.pagerInfo}
					page={this.props.page}
					onPagerItemClick={this.props.handlePagerItemClick}/>
			</div>
		);
	}
}