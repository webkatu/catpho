export const createPagerPath = (pageNumber) => {
		const path = location.pathname.replace(location.search, '');
		if(pageNumber === 1) return path;
		
		const query = `page=${pageNumber}`;
		let qs = location.search.slice(1);

		if(qs === '') {
			qs = query;
		}else if(! qs.includes('page=')) {
			qs = query + '&' + qs;
		}else {
			qs = qs.replace(/page=\d+/, query);
		}
		return path + '?' + qs;
}