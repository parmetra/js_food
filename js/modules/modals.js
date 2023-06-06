const modals = function() {
	function showThanksModal(message) {
		const modalDialog = document.querySelector(".modal__dialog");
		modalDialog.classList.add("hide");
		modalWindow("show", "hide", "hidden");

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
			modalWindow("hide", "show", "");


		}, 2000);
	}

	/* Модальное окно */
	const modalTrigger = document.querySelectorAll("[data-modal]"),
		// modalClose = document.querySelectorAll("[data-close]"),
		modal = document.querySelector(".modal");

	function modalWindow(first, seconds, isHidden) {
		modal.classList.add(first);
		modal.classList.remove(seconds);
		document.body.style.overflow = isHidden;
		clearInterval(modalTimerID);
	}

	modalTrigger.forEach(item => {
		item.addEventListener("click", () => {
			modalWindow("show", "hide", "hidden");
		});
	});	

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") { // Делегирование событий на динамические крестики закрытия окон
			modalWindow("hide", "show", "");
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) modalWindow("hide", "show", "");
	});

	// Таймер для появления модального окна через определенное время
	const modalTimerID = setTimeout(() => {
		modalWindow("show", "hide", "hidden");
	}, 300000);

	// Слушатель модального окна после скролла
	window.addEventListener("scroll", showModalByScroll);

	// Функция появления модального окна после скролла
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modalWindow("show", "hide", "hidden");
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
};

module.exports = modals;
