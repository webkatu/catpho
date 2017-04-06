import qs from 'querystring';

export const createPagerPath = (pageNumber) => {
	const pathname = location.pathname;
	const params = new URLSearchParams(location.search);
	if(Number(pageNumber) === 1) {
		params.delete('page');
		const queryString = params.toString();
		if(queryString === '') return pathname;
		return pathname + '?' + queryString;
	}

	params.set('page', pageNumber);
	return pathname + '?' + params.toString();
}