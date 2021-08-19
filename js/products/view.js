'use strict';

export const elements = {
	productsContainer: document.querySelector('#products-container'), // место для товара
};

// Принимает массив с продуктами
export function renderProducts(productsArray) {
	productsArray.forEach(function (item) {
		const productHTML = `
			<div class="col-md-6">
				<div class="card mb-4" data-id="${item.id}">
					<img class="product-img" src="img/roll/${item.imgSrc}" alt="#" />
					<div class="card-body text-center">
						<h4 class="item-title">${item.title}</h4>
						<p><small data-items-in-box="" class="text-muted">${item.itemsInBox} шт.</small></p>

						<div class="details-wrapper">
							<!-- Счетчик -->
							<div class="items counter-wrapper">
								<div class="items__control" data-action="minus">-</div>
								<div class="items__current" data-counter="">1</div>
								<div class="items__control" data-action="plus">+</div>
							</div>
							<!-- // Счетчик -->

							<div class="price">
								<div class="price__weight">${item.weight}г.</div>
								<div class="price__currency">${item.price} ₽</div>
							</div>
						</div>

						<button
							data-action="add-to-cart"
							type="button"
							class="btn btn-block btn-outline-warning">
							+ в корзину
						</button>
					</div>
				</div>
			</div>
		`;

		// добавл. на стр. товары
		elements.productsContainer.insertAdjacentHTML('beforeend', productHTML);
	})
}

// Приним. продукт для отображения знач. счётчика
export function updateCounter(product) {

	// Находим на стр. блок с продуктом
	const counterWrapper = document.querySelector(`[data-id="${product.id}"]`);

	// Находим div с числом счётчика
	const counterElement = counterWrapper.querySelector('[data-counter]');

	// Обновляем знач. в разметке
	counterElement.innerText = product.counter;
}
