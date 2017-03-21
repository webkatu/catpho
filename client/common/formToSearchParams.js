export default function formToSearchParams(form) {
	const searchParams = new URLSearchParams();
	const formData = new FormData(form);
	for(const value of formData.entries()) {
		if(value[1] instanceof Blob) continue;
		searchParams.append(value[0], value[1]);
	}

	return searchParams;
}