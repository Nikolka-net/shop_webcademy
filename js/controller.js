'use strict';

import ProductsModel from './products/model.js';

import * as productsView from './products/view.js'; // импорт всего из view.js

const productsModel = new ProductsModel();

// Асинхронная ф-я
// 1. Получение товаров из JSON файла
// 2. После этого отображение товаров на стр.
async function getAndRenderProducts() {
	await productsModel.loadProducts(); // ждём получения данных

// Добавл. для отображения товары из JSON из model.js
	productsView.renderProducts(productsModel.products);
}
getAndRenderProducts();
