import { modalWindow } from "./modals";
import { postData } from "../services/services";

const forms = function(formSelector, modalSelector, modalTimerID) {
	function showThanksModal(message) {
		const modalDialog = document.querySelector(".modal__dialog");
		modalDialog.classList.add("hide");
		modalWindow("show", "hide", "hidden", modalSelector, modalTimerID);

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			modalDialog.classList.remove("hide");
			modalDialog.classList.add("show");
			modalWindow("hide", "show", "", modalSelector, modalTimerID);


		}, 2000);
	}
	// Формы
	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'spinner.svg',
		succes: "Успех",
		failure: "Что-то пошло не так"
	};

	forms.forEach(item => { // Навешивание функции bindPostData (ниже) на каждую форму
		bindPostData(item);
	});

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

export default forms;
