'use strict';

export default class Model {
	constructor() {
		this.cart = []; // для товаров
		this.loadCartFromLocalStorage(); // запуск метода при обновлении, открытии стр.
	}

	// Сохранение данных корзины в localStorage
	saveCartToLocalStorage() {
		localStorage.setItem('cart', JSON.stringify(this.cart)); // сохр. под ключом cart
	}

	// Получение данных корзины из localStorage
	loadCartFromLocalStorage() {

		const data = localStorage.getItem('cart'); // получаем
		if (data) { // если есть
			this.cart = JSON.parse(data); // превр. в объект из строки и запис. в массив
		}
	}


	// Добавление товара в корзину
	addToCart(product) {

		let productInCart;

		// Находим товар в корзине
		productInCart = this.cart.find(function (productInCart) { // перебор элементов
			return productInCart.id === product.id; // возврат т., если он есть в корзине
		})

		if (productInCart) { // если такой товар есть в корзине
			productInCart.counter = productInCart.counter + product.counter; // увелич. счётчик
		} else {

			// Копируем объект через JSON, чтобы ссылка на объект "потерялась"
			const newProduct = JSON.parse(JSON.stringify(product)); // превр. строчку снова в объект, он новый, отличный от объекта в массиве. Иначе в корзине ссылки на один и тот же объект.
			this.cart.push(newProduct); // пушим новый объект в массив корзины
		}

		this.saveCartToLocalStorage(); // сохр. в local
	}

	// Пересчёт общей стоимости
	getTotalCartPrice() {

		let totalPrice = 0; // общая цена

		this.cart.forEach(function (item) {
			totalPrice = totalPrice + (item.price * item.counter); // складыв. цены с учётом счётчика
		})
		return totalPrice
	}

	//Обновление счётчика в корзине
	updateCounterInCart(id, action) {

		let productInCart; // товар в корзине

		// Ищем в массиве эл. по id, продукт в списке продуктов
		productInCart = this.getProductInCart(id) // возврат эл. с нужным id

		// Измен. значение счётчика
		if (action === 'plus') {
			++productInCart.counter;
		}
		// Уменьшаем, но не меньше 1
		if (action === 'minus' && productInCart.counter > 0) {
			--productInCart.counter;
		}

		// Удаление товар если счётчик меньше 1
		if (productInCart.counter === 0) {
			// Находим индекс товара в массиве корзины по id
			const index = this.cart.findIndex((item) => {
				return item.id === productInCart.id;
			});

			this.cart.splice(index, 1); // удаляем 1 эл. с нужным индексом

		}

		this.saveCartToLocalStorage(); // сохр. в local

		return productInCart; // возврат элемента(товара) со всеми свойствами

	}

	// Получаем данные(товар) из массива по id в корзине
	getProductInCart(id) {

		// Ищем в массиве эл. по id, продукт в списке продуктов
		return this.cart.find((item) => item.id === id) // возврат эл. с нужным id

	}

}
