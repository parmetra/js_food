"use strict";

window.addEventListener("DOMContentLoaded", () => {
	// Табы - 1 урок
	const tabs = document.querySelectorAll(".tabheader__item"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabsParent = document.querySelector(".tabheader__items");

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});

		tabs.forEach(item => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");		

		tabs[i].classList.add("tabheader__item_active");
	}


	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", (e) => {
		let target = e.target;

		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Таймер - 2 урок
	const deadline = "2023-05-28";

	function getTimeRemaining(end) {
		const t = Date.parse(end) - Date.parse(new Date());
		if (t <= 0) return {
			"total": 0,
			"days": 0,
			"hours": 0,
			"minutes": 0,
			"seconds": 0
		};
		let days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / (1000 * 60)) % (60)),
			seconds = Math.floor((t / (1000)) % (60));
		return {
			"total": t,
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		}
		else return num;
	}

	function setClock(selector, time) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);
		updateClock();

		function updateClock() {
			let t = getTimeRemaining(time);

			days.textContent = getZero(t.days);
			hours.textContent = getZero(t.hours);
			minutes.textContent = getZero(t.minutes);
			seconds.textContent = getZero(t.seconds);

			if (t.total <= 0) clearInterval(timeInterval);
		}
	}

	setClock(".timer", deadline);

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

	/* modalClose.forEach(item => {
		item.addEventListener("click", () => {
			modalWindow("hide", "show", "");
		});
	}); */

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

	/* Создание класса для карточек */
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.converterPrice();
		}

		converterPrice() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement("div");
			if (this.classes.length != 0) {
				this.classes.forEach(item => {				
					element.classList.add(item);
				});
			}
			else {
				this.element = "menu__item";
				element.classList.add(this.element);
			}
			
			element.innerHTML = `
			<div>
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню Фитнес”',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		10,
		".menu .container",
		'menu__item',
		'big'
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню “Премиум”',
		"В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
		20,
		".menu .container",
		'menu__item'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню “Постное””',
		"Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ",
		7,
		".menu .container",
		'menu__item'
	).render();

	// Формы
	const forms = document.querySelectorAll("form");

	const message = {
		loading: 'spinner.svg',
		succes: "Успех",
		failure: "Что-то пошло не так"
	};

	forms.forEach(item => { // Навешивание функции postData (ниже) на каждую форму
		postData(item);
	});

	function postData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			// form.append(statusMessage);
			form.insertAdjacentElement("afterend", statusMessage);

			const request = new XMLHttpRequest();
			request.open("POST", "server.php");
			// request.setRequestHeader("Content-type", "undefined"); // для формата FormData
			request.setRequestHeader("Content-type", "application/json");

			const object = {};

			const formData = new FormData(form);

			formData.forEach(function(value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);


			// request.send(formData); // для формата FormData
			request.send(json);

			request.addEventListener("load", () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.succes);
					form.reset();
					statusMessage.remove();
				}
				else {
					showThanksModal(message.failure);
				}
			});
		});
	}

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
});



