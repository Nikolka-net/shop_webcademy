'use strict';

// Import
import ProductsModel from './products/model.js';

import CartModel from './cart/model.js'; // импорт модели корзины

import * as productsView from './products/view.js'; // импорт всего из product/view.js

import * as cartView from './cart/view.js'; // импорт всего из cart/view.js



// Объекты
const productsModel = new ProductsModel();

const cartModel = new CartModel();


// Асинхронная ф-я
// 1. Получение товаров из JSON файла
// 2. После этого отображение товаров на стр.
async function getAndRenderProducts() {
	await productsModel.loadProducts(); // ждём получения данных

	// Добавл. для отображения товары из JSON из model.js
	productsView.renderProducts(productsModel.products);

	// Отображение товаров в корзине, в том числе из localStorage, если есть
	cartView.renderCart(cartModel.cart);

	// Пересчёт общей стоимости заказа в корзине
	const totalPrice = cartModel.getTotalCartPrice();

	// Обновляем и вставляем цену на стр.
	cartView.updateOrderPrice(totalPrice);
}
getAndRenderProducts();

// При клике на плюс, минус, кнопку "в корзину"
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

		// Пересчёт общей стоимости заказа в корзине
		const totalPrice = cartModel.getTotalCartPrice();

		// Обновляем и вставляем цену на стр.
		cartView.updateOrderPrice(totalPrice);

	}
});

// При клике на кнопки в корзине
cartView.elements.cartWrapper.addEventListener('click', function (event) {

	// Записываем совершаемое действие
	let action = event.target.dataset.action;

	// Находим id товара по родителю с классом cart-item, перевод в цифры из строки
	function getProductIdInCart() {
		return +event.target.closest('.cart-item').dataset.id;
	}


	// Клик по счётчику внутри корзины
	if (action === 'plus' || action === 'minus') {
		// Находим id продукта в корзине
		const productId = getProductIdInCart();

		// Запуск метода в модели корзины для изм. счётчика
		const product = cartModel.updateCounterInCart(productId, action);

		if (product.counter > 0) {
			// Обновляем счётчик в корзине на стр.
			cartView.updateCounter(product);

		} else {
			// Удаляем товар в корзине на стр.
			cartView.removeItemFromCart(product);
		}

		// Пересчёт общей стоимости заказа в корзине
		const totalPrice = cartModel.getTotalCartPrice();

		// Обновляем и вставляем цену на стр.
		cartView.updateOrderPrice(totalPrice);

	}

})
