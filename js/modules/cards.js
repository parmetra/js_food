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

	const getResources = async (url) => {
		const result = await fetch(url);
		if (!result.ok) {
			throw new Error(`Мы не можем получить ${url}. Статус: ${result.status}`);
		}
		return await result.json();
	};

	// Библиотека axios для постинга
	axios.get("http://localhost:3000/menu").then(data => {
		data.data.forEach(({img, altimg, title, descr, price}) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
		});
	});
};

module.exports = cards;