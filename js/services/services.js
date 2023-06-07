const postData = async (url, data) => {
	const result = await fetch(url, {
		method: "POST",
		headers: {
				"Content-type": "application/json"
		},
		body: data
	});

	return await result.json();
};

const getResources = async (url) => {
	const result = await fetch(url);
	if (!result.ok) {
		throw new Error(`Мы не можем получить ${url}. Статус: ${result.status}`);
	}
	return await result.json();
};

export {postData};
export {getResources};