import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty</p>';
    return;
  }
  const cartTotal = calculateCartTotal(cartItems);
  renderCartTotal(cartTotal);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.totalPrice, 0);
}

function renderCartTotal(total) {
  document.querySelector('#cart-total').innerHTML = `Cart Total: $${total}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__total_price">Product Total: $${item.totalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
