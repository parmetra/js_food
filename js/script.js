"use strict";

window.addEventListener("DOMContentLoaded", () => {
	const tabs = require("./modules/tabs"),
		  modals = require("./modules/modals"),
		  timers = require("./modules/timers"),
		  forms = require("./modules/forms"),
		  cards = require("./modules/cards"),
		  sliders = require("./modules/sliders"),
		  calc = require("./modules/calc");

	tabs();
	modals();
	timers();
	forms();
	cards();
	sliders();
	calc();
});



