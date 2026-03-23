import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from './utils.mjs';

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image.replace('../images/', '/images/')}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.qty || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor() {
    this.items = getLocalStorage('so-cart') || [];
    this.listElement = document.querySelector('.product-list');
  }

  async init() {
    this.renderCart();
  }

  renderCart() {
    if (this.items.length === 0) {
      this.listElement.innerHTML = '<p>Your cart is empty</p>';
      this.renderCartTotal();
      return;
    }

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      this.items,
      'afterbegin',
      true,
    );

    this.renderCartTotal();
  }

  renderCartTotal() {
    const existing = document.querySelector('.cart-total');
    if (existing) existing.remove();

    const total = this.getTotal();
    const totalEl = document.createElement('p');
    totalEl.classList.add('cart-total');
    totalEl.textContent = `Cart Total: $${total.toFixed(2)}`;
    this.listElement.insertAdjacentElement('afterend', totalEl);
  }

  addItem(item) {
    this.items.push(item);
    setLocalStorage('so-cart', this.items);
    this.renderCart();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    setLocalStorage('so-cart', this.items);
    this.renderCart();
  }

  clearCart() {
    this.items = [];
    setLocalStorage('so-cart', this.items);
    this.renderCart();
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.FinalPrice * (item.qty || 1),
      0,
    );
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + (item.qty || 1), 0);
  }
}
