import config from '../config.js';

export const signOut = () => {
	const userToken = localStorage.getItem('userToken');
	(async () => {
		const response = await fetch(config.apiServer + '/signout', {
			method: 'post',
			headers: {
				...config.defaultHeaders,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userToken }),
		});
		if(! response.ok) throw new Error(response.status);

		const json = await response.json();
		if(! json.success) throw json.error;

	})().catch((e) => {
		console.log(e);
	});

	return {
		type: 'SIGN_OUT',
	};
}