"use strict";

import tabs from "./modules/tabs";
import modals from "./modules/modals";
import timers from "./modules/timers";
import forms from "./modules/forms";
import cards from "./modules/cards";
import sliders from "./modules/sliders";
import calc from "./modules/calc";
import {modalWindow} from "./modules/modals";

window.addEventListener("DOMContentLoaded", () => {

	// Таймер для появления модального окна через определенное время
	const modalTimerID = setTimeout(() => {
		modalWindow("show", "hide", "hidden", ".modal", modalTimerID);
	}, 300000);

	tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
	modals("[data-modal]", ".modal", modalTimerID);
	timers(".timer", "2023-06-30");
	forms("form", ".modal", modalTimerID);
	cards();
	sliders({
		container: ".offer__slider",
		nextArrow: ".offer__slider-next", 
		prevArrow: ".offer__slider-prev",
		totalCounter: "#total",
		slide: ".offer__slide",
		currentCounter: "#current",
		wrapper: ".offer__slider-wrapper",
		field: ".offer__slider-inner"
	});
	calc();
});



