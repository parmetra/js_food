function modalWindow(firstClass, secondsClass, isHidden, modalSelector, modalTimerID) {
	const modal = document.querySelector(modalSelector);	
	modal.classList.add(firstClass);
	modal.classList.remove(secondsClass);
	document.body.style.overflow = isHidden;

	if (modalTimerID) {
		clearInterval(modalTimerID);
	}	
}

const modals = function(triggerSelector, modalSelector, modalTimerID) {
	
	/* Модальное окно */
	const modalTrigger = document.querySelectorAll(triggerSelector),
		// modalClose = document.querySelectorAll("[data-close]"),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(item => {
		item.addEventListener("click", () => {
			modalWindow("show", "hide", "hidden", modalSelector, modalTimerID);
		});
	});	

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") { // Делегирование событий на динамические крестики закрытия окон
			modalWindow("hide", "show", "", modalSelector, modalTimerID);
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) modalWindow("hide", "show", "", modalSelector, modalTimerID);
	});

	// Слушатель модального окна после скролла
	window.addEventListener("scroll", showModalByScroll);

	// Функция появления модального окна после скролла
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			modalWindow("show", "hide", "hidden", modalSelector, modalTimerID);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
};

export default modals;
export {modalWindow};
