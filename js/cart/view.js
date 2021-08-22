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
							<div class="price__currency">${item.price} ₽</div>
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

	toggleCart();
}

// Скрытие, показ блоков на стр.: "корзина пуста", "форма отправка заказа"
function toggleCart() {

	if (elements.cartWrapper.children.length > 0) { // если в корзине есть дочер. эл, не пуста
		elements.cartEmptyBadge.classList.add('none'); // скрытие бейджа "корзина пуста"
		elements.orderForm.classList.remove('none'); // показ блока с формой заказа
	} else {
		elements.cartEmptyBadge.classList.remove('none'); // скрытие бейджа "корзина пуста"
		elements.orderForm.classList.add('none'); // показ блока с формой заказа

	}
}

// Обновление общей стоимости заказа в корзине
export function updateOrderPrice(price) {

	// Вставляем цену, предвари-но отформатировав её
	elements.totalPrice.innerText = new Intl.NumberFormat().format(price);
}

// Обновляем счётчик в корзине


function findProductWrapper(product) { // находим товар по id
	return elements.cartWrapper.querySelector(`[data-id="${product.id}"]`);
}

export function updateCounter(product) {

	// Находим товар по id
	const productWrapper = findProductWrapper(product);

	// Находим счётчик
	const counterElement = productWrapper.querySelector('[data-counter]');

	counterElement.innerText = product.counter; // запис. туда значение счётчика

}

// Удаляем товар в корзине
export function removeItemFromCart(product) {

	// Находим товар по id
	const productWrapper = findProductWrapper(product);
	productWrapper.remove(); // удаляем товар
	toggleCart(); // скрытие, показ "корзина пуста", форма заказа
}
