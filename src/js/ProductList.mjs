import { renderProductList } from "./utils.mjs";


function productCardTemplate(product) {
    return `
        <li class="product-card">
            <img src="${product.Image}" alt="${product.NameWithoutBrand}">
            <h2 class="card__brand">${product.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">Price: $${product.ListPrice}</p>
        </li>
    `;
}

export default class ProductList {

    constructor(category,dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderProductList(list);
    }

    renderProductList(list) {
    const productListHTML = list.map(product => productCardTemplate(product)).join('');
    this.listElement.innerHTML = productListHTML;
    }
}

