import qs from 'querystring';

export const createPagerPath = (pageNumber) => {
	const pathname = location.pathname;
	const query = qs.parse(location.search.slice(1));
	if(Number(pageNumber) === 1) {
		delete query.page;
		const queryString = qs.stringify(query);
		if(queryString === '') return pathname;
		return pathname + '?' + queryString;
	}

	query.page = pageNumber;
	return pathname + '?' + qs.stringify(query);
}