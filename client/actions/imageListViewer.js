export const requestImageList = (path) => {
	return {
		type: 'REQUEST_IMAGE_LIST',
		path,
	}
}

const fetchImageListSuccess = (path, json, contentsPath, imagesPath) => {
	const images = json.contents.map((content) => {
		return {
			id: content.id,
			href: contentsPath + '/' + content.id,
			src: imagesPath + '/' + content.filename,
		}
	});

	return {
		type: 'FETCH_IMAGE_LIST_SUCCESS',
		path,
		images,
		pagerInfo: {
			currentPage: json.currentPage,
			maxPage: json.maxPage,
		}
	};
}

const fetchImageListFailure = (path, error) => {
	return {
		type: 'FETCH_IMAGE_LIST_FAILURE',
		path,
		error,
	};
}

export const fetchImageList = (path, interval, contentsPath, imagesPath) => {
	return async (dispatch) => {
		dispatch(requestImageList(path));
		
		const response = await fetch(path, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ interval })
		});

		console.log(response);
		if (! response.ok) {
			const error = new TypeError(response.status);
			dispatch(fetchImageListFailure(path, error));
			return;
		}

		const json = await response.json();
		dispatch(fetchImageListSuccess(path, json, contentsPath, imagesPath));
	}
}

export const init = () => {
	return {
		type: 'INIT',
	}
}

export const toggleAutoReload = (checked) => {
	return {
		type: 'TOGGLE_AUTO_RELOAD',
		shouldAutoReload: checked
	};
}