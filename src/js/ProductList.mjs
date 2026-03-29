import { formatCategoryName, renderListWithTemplate } from './utils.mjs';

function getProductListImage(product) {
  return product.Images?.PrimaryMedium || product.Image;
}

function productCardTemplate(product, category) {
  const detailParams = new URLSearchParams({
    product: product.Id,
  });

  if (category) {
    detailParams.set('category', category);
  }

  return `<li class="product-card">
    <a href="../product_pages/index.html?${detailParams.toString()}">
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
  constructor(category, dataSource, listElement, options = {}) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
    this.title = options.title || null;
    this.linkCategory = options.linkCategory || category || null;
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

    if (this.title) {
      titleElement.textContent = this.title;
      return;
    }

    if (!this.category) {
      titleElement.textContent = 'Top Products';
      return;
    }

    const formattedCategory = formatCategoryName(this.category);

    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }

  renderList(list) {
    const template = (product) => productCardTemplate(product, this.linkCategory);
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      'afterbegin',
      true,
    );
  }
}
