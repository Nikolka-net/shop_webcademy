'use strict';

export default class Model {
	constructor() {
		this.products = []; // для продуктов
	}

	// Получение продукта из json асинхронно
	async loadProducts() {
		const response = await fetch('./js/products.json'); // получение, запись ответа(promise) в response

		this.products = await response.json(); // записыв. данные в виде объекта благодаря json()

	}



}
