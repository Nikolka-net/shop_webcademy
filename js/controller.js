'use strict';

// Import
import ProductsModel from './products/model.js';

import CartModel from './cart/model.js'; // импорт модели корзины

import * as productsView from './products/view.js'; // импорт всего из product/view.js

import * as cartView from './cart/view.js'; // импорт всего из cart/view.js

// Объекты
const productsModel = new ProductsModel();

const cartModel = new CartModel();

// const cartView = new CartView();


// Асинхронная ф-я
// 1. Получение товаров из JSON файла
// 2. После этого отображение товаров на стр.
async function getAndRenderProducts() {
	await productsModel.loadProducts(); // ждём получения данных

	// Добавл. для отображения товары из JSON из model.js
	productsView.renderProducts(productsModel.products);
}
getAndRenderProducts();

productsView.elements.productsContainer.addEventListener('click', function (event) {

	// Записываем совершаемое действие
	let action = event.target.dataset.action;


	// Находим id товара по родителю с классом card, перевод в цифры из строки
	function getProductId() {
		return +event.target.closest('.card').dataset.id;
	}

	if (action === 'plus' || action === 'minus') {

		const productId = getProductId(); // получ. id

		// Запуск модели для изменения счётчика, возвр. нужный товар
		const product = productsModel.updateCounter(productId, action);

		// Обновляем счётчик на стр.
		productsView.updateCounter(product); // перед. продукт для отобра-я во view

	}

	// Добавление товара в корзину
	if (action === 'add-to-cart') {

		const productId = getProductId();

		// Получаем товар из productsModel
		const product = productsModel.getProduct(productId)

		// Добавляем товар в корзину - данные
		cartModel.addToCart(product);

		// Отображение товара на стр. в корзине - VEIW
		cartView.renderCart(cartModel.cart);

		// Сбросить коли-во товара в каталоге на 1
		productsModel.resetCounter(product);

		// Обновляем счётчик товара на стр.
		productsView.updateCounter(product);

	}
});
