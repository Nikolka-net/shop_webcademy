'use strict';

export default class Model {
	constructor() {
		this.cart = []; // для товаров
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
		console.log('this.cart: ', this.cart);

	}

}
