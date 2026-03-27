import { formatCategoryName, renderListWithTemplate } from './utils.mjs';

function getProductListImage(product) {
  return product.Images?.PrimaryMedium || product.Image;
}

function productCardTemplate(product, category) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${encodeURIComponent(product.Id)}&category=${encodeURIComponent(category)}">
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
    return this.products;
  }

  updateTitle() {
    const titleElement = document.querySelector('.products h2');
    if (!titleElement) return;

    const formattedCategory = formatCategoryName(this.category);

    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }

  renderList(list) {
    const template = (product) => productCardTemplate(product, this.category);
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }
}
