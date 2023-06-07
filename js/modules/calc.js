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

export default calc;