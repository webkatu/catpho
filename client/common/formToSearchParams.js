export default function formToSearchParams(form) {
	const searchParams = new URLSearchParams();
	Array.from(form.querySelectorAll('[name]'), (node) => {
		if(node.files instanceof FileList) return;
		searchParams.append(node.name, node.value);
	});

	return searchParams;
}