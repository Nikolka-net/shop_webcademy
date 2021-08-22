'use strict';

export default class Model {
	constructor() {
		this.products = []; // для продуктов
	}

	// Получение продукта из json асинхронно
	async loadProducts() {
		const response = await fetch('./js/products.json'); // получение, запись ответа(promise) в response

		this.products = await response.json(); // записыв. данные в виде объекта благодаря json()

		for (const product of this.products) { // перебор эл. в массиве
			product.counter = 1; // присваиваем кажд. продукту значение счётчика

		}

	}

	// Обновление счётчика
	updateCounter(id, action) {

		// Ищем в массиве эл. по id, продукт в списке продуктов
		const product = this.getProduct(id) // возврат эл. с нужным id

		// Измен. значение счётчика
		if (action === 'plus') {
			++product.counter;
		}
		if (action === 'minus' && product.counter > 1) {
			--product.counter;
		}

		return product; // возврат элемента(товара) со всеми свойствами

	}

	// Получаем данные(товар) из массива по id
	getProduct(id) {

		// Ищем в массиве эл. по id, продукт в списке продуктов
		return this.products.find((item) => item.id === id) // возврат эл. с нужным id

	}

	// Сброс счётчика в каталоге товара на 1
	resetCounter(product) {
		product.counter = 1;
	}
}
