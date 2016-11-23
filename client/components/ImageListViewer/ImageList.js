import React from 'react';
import Image from './Image.js';
import Pager from './Pager.js';
import ImagesNotFound from './ImagesNotFound.js';

export default class ImageList extends React.Component {
	render() {
		if(this.props.images.length === 0) {
			return (
				<div className="imageList">
					<ImagesNotFound />
				</div>
			);
		}

		const imageNodes = this.props.images.map((image, i) => {
			return (<Image id={image.id} href={image.href} src={image.src} key={i} />)
		});

		return (
			<div className="imageList">
				<div className="images">{imageNodes}</div>
				<Pager pagerInfo={this.props.pagerInfo}/>
			</div>
		);
	}
}