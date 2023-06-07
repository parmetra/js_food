/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = function() {
	// Калькулятор на сайте
	let calcResult = document.querySelector(".calculating__result span"),
		gender,
		ratio,
		height, weight, age;
	
	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = "1.375";
		localStorage.setItem("ratio", ratio);
	}
	if (localStorage.getItem("gender")) {
		gender = localStorage.getItem("gender");
	} else {
		gender = "female";
		localStorage.setItem("gender", gender);

	}

	function initLocalSettings(selector, activeClass) {
		let elements = document.querySelectorAll(selector);

		elements.forEach(item => {
			if (item.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
				item.classList.add(activeClass);
			}
			else if (item.getAttribute("id") == localStorage.getItem("gender")) {
				item.classList.add(activeClass);
			}
			else {
				item.classList.remove(activeClass);
			}
		})
	}

	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

	function formulaCalorie() {
		if (!gender || !height || !weight || !age || !ratio) {
			calcResult.textContent = "____";
			return;
		}

		if (gender == "male") {
			calcResult.textContent = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
		}
		else if (gender == "female") {
			calcResult.textContent = Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
		}
	}

	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(item => {
			item.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", ratio);
				} else {
					gender = e.target.getAttribute("id");
					localStorage.setItem("gender", gender);
				}
	
				elements.forEach(item => {
					item.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
				formulaCalorie();
			});
		});
	}

	getStaticInfo("#gender div", "calculating__choose-item_active");
	getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

	function getDynamicInfo(selector) {
		let input = document.querySelector(selector);
		input.addEventListener("input", () => {

			if(input.value.match(/\D/g)) {	// подсветка инпута красным, если в поле не цифра
				input.style.border = "2px dotted red";
			} else {
				input.style.border = "none";
			}

			switch(input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}
		formulaCalorie();
		});
	}

	getDynamicInfo("#height");
	getDynamicInfo("#weight");
	getDynamicInfo("#age");
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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

	// Библиотека axios для постинга
	axios.get("http://localhost:3000/menu").then(data => {
		data.data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
		});
	});
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const forms = function(formSelector, modalSelector, modalTimerID) {
	function showThanksModal(message) {
		const modalDialog = document.querySelector(".modal__dialog");
		modalDialog.classList.add("hide");
		(0,_modals__WEBPACK_IMPORTED_MODULE_0__.modalWindow)("show", "hide", "hidden", modalSelector, modalTimerID);

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
			(0,_modals__WEBPACK_IMPORTED_MODULE_0__.modalWindow)("hide", "show", "", modalSelector, modalTimerID);


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

		
			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modalWindow: () => (/* binding */ modalWindow)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sliders = function({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	// Слайдер
	/* let nextSlideBtn = document.querySelector(".offer__slider-next"),
		prevSlideBtn = document.querySelector(".offer__slider-prev"),
		currentSlide = document.querySelector("#current"),
		totalSlide = document.querySelector("#total"),
		imageSlide = document.querySelectorAll(".offer__slide"),
		counterSlides = 1;
		
	totalSlide.textContent = isLessThanTen(imageSlide.length);	// добавляем на страницу общее количество слайдом, применив функцию isLessThanTen()
	slidePhoto(counterSlides);									// впервый раз инициализируем слайды на странице

	nextSlideBtn.addEventListener("click", () => {	// кнопка слайдов вперёд
		counterSlides++;
		if (counterSlides > (totalSlide.textContent)) {
			counterSlides = 1;
		}
		slidePhoto(counterSlides);
	});

	prevSlideBtn.addEventListener("click", () => {	// кнопка слайдов назад
		counterSlides--;
		if (counterSlides < 1) {
			counterSlides = imageSlide.length;
		}
		slidePhoto(counterSlides);

	});

	function isLessThanTen(number) { //функция добавляет `0` перед числом, если оно меньше 10
		if (number < 10) {
			number = `0${number}`;
		}
		return number;
	}

	function slidePhoto(counterSlides) {	// функция переключения слайдов
		imageSlide.forEach((item) => {
			item.classList.remove("show");	// убираем у всех салйдов класс show
			item.classList.add("hide");		// добавляем всем слайдам класс hide
		});
		imageSlide[counterSlides - 1].classList.remove("hide"); // убираем у текущшего слайда hide
		imageSlide[counterSlides - 1].classList.add("show");	// добавляем текущему слайду show
		currentSlide.textContent = isLessThanTen(counterSlides);// выводим значение текущего слайда
	} */


	// Слайдер 2. Сложная версия
	let nextSlideBtn = document.querySelector(nextArrow),
		prevSlideBtn = document.querySelector(prevArrow),
		currentSlide = document.querySelector(currentCounter),
		totalSlide = document.querySelector(totalCounter),
		imageSlide = document.querySelectorAll(slide),
		counterSlides = 1,
		offset = 0,
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		widthSlide = window.getComputedStyle(slidesWrapper).width;

	slidesField.style.width = 100 * imageSlide.length + "%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";

	slidesWrapper.style.overflow = "hidden";

	imageSlide.forEach(item => {
		item.style.width = widthSlide;
	})

	nextSlideBtn.addEventListener("click", () => {	// кнопка слайдов вперёд
		counterSlides++;
		if(offset == clearNotDigits(widthSlide) * (imageSlide.length - 1) && (counterSlides > totalSlide.textContent)) {	// проверка на то, что слайд и счётчик являются последними
			offset = 0;
			counterSlides = 1;
		}
		else {
			offset += clearNotDigits(widthSlide);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		currentSlide.textContent = isLessThanTen(counterSlides);// выводим значение текущего слайда
		
		dotsNavigating(dots, counterSlides);
	});

	prevSlideBtn.addEventListener("click", () => {	// кнопка слайдов назад
		counterSlides--;
		if(offset == 0 && (counterSlides < 1)) {	// проверка на то, что слайд и счётчик являются последними
			offset = clearNotDigits(widthSlide) * (imageSlide.length - 1);
			counterSlides = imageSlide.length;
		}
		else {
			offset -= clearNotDigits(widthSlide);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		currentSlide.textContent = isLessThanTen(counterSlides);// выводим значение текущего слайда
		
		dotsNavigating(dots, counterSlides);
	});

	function isLessThanTen(number) { //функция добавляет `0` перед числом, если оно меньше 10
		if (number < 10) {
			number = `0${number}`;
		}
		return number;
	}

	// Навигация в слайдере
	let slider = document.querySelector(container);

	slider.style.position = "relative";

	const indicators = document.createElement("ol"),
		  dots = [];
	indicators.classList.add("carousel-indicators");
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < imageSlide.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	dots.forEach (dot => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			counterSlides = slideTo;
			offset = clearNotDigits(widthSlide) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			currentSlide.textContent = isLessThanTen(slideTo);// выводим значение текущего слайда

			dotsNavigating(dots, counterSlides);

		});
	});
	
	function dotsNavigating(dots, counterSlides) {
		dots.forEach(dot => {
			dot.style.opacity = ".5";
		});
		dots[counterSlides - 1].style.opacity = "1";
	}

	function clearNotDigits(str) {	// очистка строки от всех символов, кроме чисел
		return +str.replace(/\D/g, "");
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	// Табы
	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});

		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");		

		tabs[i].classList.add(activeClass);
	}


	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", (e) => {
		let target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timers.js":
/*!******************************!*\
  !*** ./js/modules/timers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timers = function(id, deadline) {
	// Таймер - 2 урок

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

	setClock(id, deadline);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timers);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_timers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timers */ "./js/modules/timers.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");











window.addEventListener("DOMContentLoaded", () => {

	// Таймер для появления модального окна через определенное время
	const modalTimerID = setTimeout(() => {
		(0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.modalWindow)("show", "hide", "hidden", ".modal", modalTimerID);
	}, 300000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
	(0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerID);
	(0,_modules_timers__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2023-06-30");
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])("form", ".modal", modalTimerID);
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_sliders__WEBPACK_IMPORTED_MODULE_5__["default"])({
		container: ".offer__slider",
		nextArrow: ".offer__slider-next", 
		prevArrow: ".offer__slider-prev",
		totalCounter: "#total",
		slide: ".offer__slide",
		currentCounter: "#current",
		wrapper: ".offer__slider-wrapper",
		field: ".offer__slider-inner"
	});
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map