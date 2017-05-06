import easyimage from 'easyimage';
import fscopy from './fscopy.js';
import config from '../config.js';

export default {
	async resize(size, src, dst) {
		const image = await easyimage.info(src);
		if(image.width <= size && image.height <= size) {
			return await fscopy(src, dst);
		}

		let width, height;
		if(image.width > image.height) {
			width = size;
			height = image.height / (image.width / size);
		}else {
			height = size;
			width = image.width / (image.height / size);
		}

		return await easyimage.resize({ src, dst, width, height });
	},

	async createContent(src, dst) {
		return await this.resize(config.image.contentSize, src, dst);
	},

	async createThumbnail(src, dst) {
		return await this.resize(config.image.thumbnailSize, src, dst);
	},

	async createAvatar(src, dst) {
		return await this.resize(config.image.avatarSize, src, dst);
	},
}