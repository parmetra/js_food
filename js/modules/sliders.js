const sliders = function() {
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
	let nextSlideBtn = document.querySelector(".offer__slider-next"),
		prevSlideBtn = document.querySelector(".offer__slider-prev"),
		currentSlide = document.querySelector("#current"),
		totalSlide = document.querySelector("#total"),
		imageSlide = document.querySelectorAll(".offer__slide"),
		counterSlides = 1,
		offset = 0,
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		slidesField = document.querySelector(".offer__slider-inner"),
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
	let slider = document.querySelector(".offer__slider");

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

module.exports = sliders;