import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // fetch product details using dataSource
    this.product = await this.dataSource.findProductById(this.productId);
    // render the HTML
    this.renderProductDetails();
    // set up event listener for Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const currentCart = getLocalStorage('so-cart') || [];
    const existingProductIndex = currentCart.findIndex(
      (item) => item.Id === this.product.Id,
    );

    if (existingProductIndex !== -1) {
      const item = currentCart[existingProductIndex];
      item.qty = (Number(item.qty) || 0) + 1;
      item.totalPrice = item.qty * (Number(item.FinalPrice) || 0);
    } else {
      const newItem = {
        ...this.product,
        qty: 1,
        totalPrice: Number(this.product.FinalPrice) || 0,
      };
      currentCart.push(newItem);
    }

    setLocalStorage('so-cart', currentCart);
  }

  renderProductDetails() {
    const productSection = document.querySelector('.product-detail');
    productSection.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
