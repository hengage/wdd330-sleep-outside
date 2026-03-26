import { renderListWithTemplate } from './utils.mjs';

function getProductListImage(product) {
  return product.Images?.PrimaryMedium || product.Image;
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${getProductListImage(product)}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.updateTitle();
    this.renderList(this.products);
  }

  updateTitle() {
    const titleElement = document.querySelector('.products h2');
    if (!titleElement) return;

    const formattedCategory = this.category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }
}
