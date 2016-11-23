import { LOCATION_CHANGE } from 'react-router-redux';

const url = 'http://lorempixel.com/100/100/';
const initialState = {
	path: '',
	lists: [/*
		{
			images: [
				{id: Number, src: url, href: url},
			],
			pagerInfo: {
				pathname: location.pathname,
				length: 10,
				maxPage: 100,
				currentPage: 1,
				interval: 5,
			}
		}
	*/],
	interval: 2,
	pagerTotal: 10,
	error: null,
	isLoading: false,
	shouldAutoReload: true,
	hasNextPage: false,
	isLocationChange: false,
	contentsPath: '/contents',
	imagesPath: '/uploads/contents/thumbnails',
}

const imageListViewer = (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_IMAGE_LIST':
			return Object.assign({}, state, {
				isLoading: true,
				path: action.path,
			});

		case 'FETCH_IMAGE_LIST_SUCCESS':
			const pagerInfo = action.pagerInfo;
			let startPageNumber = pagerInfo.currentPage - Math.ceil(initialState.pagerTotal / 2) + 1;
			if(startPageNumber < 1) startPageNumber = 1;

			let endPageNumber = startPageNumber + initialState.pagerTotal - 1;
			if(endPageNumber > pagerInfo.maxPage) endPageNumber = pagerInfo.maxPage;

			pagerInfo.startPageNumber = startPageNumber;
			pagerInfo.endPageNumber = endPageNumber;

			return Object.assign({}, state, {
				lists: [
					...state.lists,
					{
						images: action.images,
						pagerInfo: action.pagerInfo,
					}
				],
				isLoading: false,
				hasNextPage: pagerInfo.currentPage < pagerInfo.maxPage,
			});

		case 'FETCH_IMAGE_LIST_FAILURE':
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error,
			});

		case 'INIT':
			return Object.assign({}, state, {
				lists: [],
				isLocationChange: false,
				error: '',
			});

		case 'TOGGLE_AUTO_RELOAD':
			return Object.assign({}, state, {
				shouldAutoReload: action.shouldAutoReload,
			});

		case LOCATION_CHANGE:
			return Object.assign({}, state, {
				isLocationChange: true,
			});
	}

	return state;
}


/*
images = [
	{
		src: String,
		href: String,
	}
]

pagerInfo = {
	length: Number,
	maxPage: Number,
	currentPage: Number,
	interval: Number,
	path: String,
}
*/

export default imageListViewer;