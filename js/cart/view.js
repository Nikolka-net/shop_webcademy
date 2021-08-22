'use strict';

export const elements = {
	productsContainer: document.querySelector('#products-container'),
	cartWrapper: document.querySelector('.cart-wrapper'),
	cartEmptyBadge: document.querySelector('[data-cart-empty]'), // поле "корзина пуста"
	orderForm: document.querySelector('#order-form'), // форма заказа
	totalPrice: document.querySelector('.total-price'), // цена
};

// Отрисовка корзины(каждый раз полностью).
// Можно отрисовывать только те эл., ко-е изменились. Это лучше
export function renderCart(product) {

	let cartHTML = '';

	product.forEach(function (item) {

		// Шаблонная строка - разметка корзины
		const cartItemHTML = `
		 <div class="cart-item" data-id="${item.id}">
			<div class="cart-item__top">
				<div class="cart-item__img">
					<img src="img/roll/${item.imgSrc}" alt="${item.title}" />
				</div>
				<div class="cart-item__desc">
					<div class="cart-item__title">${item.title}</div>
					<div class="cart-item__weight">${item.itemsInBox} / ${item.weight}</div>

					<!-- cart-item__details -->
					<div class="cart-item__details">
						<div class="items items--small counter-wrapper">
							<div class="items__control" data-action="minus">-</div>
							<div class="items__current" data-counter="">${item.counter}</div>
							<div class="items__control" data-action="plus">+</div>
						</div>

						<div class="price">
							<div class="price__currency">${item.price}</div>
						</div>
					</div>
					<!-- // cart-item__details -->
				</div>
			</div>
		 </div>
	 `;

	 cartHTML = cartHTML + cartItemHTML; // добавл. то что было + новый товар
	})

	elements.cartWrapper.innerHTML = cartHTML; // добавл. разметку корзины на стр.
}
