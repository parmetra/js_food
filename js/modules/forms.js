const forms = function() {
	// Формы
	const forms = document.querySelectorAll("form");

	const message = {
		loading: 'spinner.svg',
		succes: "Успех",
		failure: "Что-то пошло не так"
	};

	forms.forEach(item => { // Навешивание функции bindPostData (ниже) на каждую форму
		bindPostData(item);
	});

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

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);
			
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

		
			postData("http://localhost:3000/requests", json)
			.then(data => {
				console.log(data);
				showThanksModal(message.succes);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});
		});
	}

	fetch("http://localhost:3000/menu")
	.then(data => data.json())
	.then(res => console.log(res));
};

module.exports = forms;
