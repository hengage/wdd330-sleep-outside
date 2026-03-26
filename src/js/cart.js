import { getCartItems, loadHeaderFooter, setCartItems } from './utils.mjs';

loadHeaderFooter();

const cartItemsKey = 'so-cart';

function getCartItemImage(item) {
  return item.Images?.PrimaryMedium || item.Image || '';
}

function renderCartContents() {
  const cartItems = getCartItems(cartItemsKey);
  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty</p>';
    renderCartTotal(cartItems);
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button
    class="cart-card__remove"
    type="button"
    aria-label="Remove ${item.Name} from cart"
    data-id="${item.Id}"
  >
    x
  </button>
  <a href="#" class="cart-card__image">
    <img
      src="${getCartItemImage(item)}"
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

  return newItem;
}

function removeItemFromCart(productId) {
  const cartItems = getCartItems(cartItemsKey);
  const updatedCartItems = cartItems.filter((item) => item.Id !== productId);
  setCartItems(updatedCartItems, cartItemsKey);
  renderCartContents();
}

function calculateCartTotal(items) {
  return items.reduce(
    (total, item) => total + item.FinalPrice * (item.qty || 1),
    0,
  );
}

function renderCartTotal(items) {
  const existing = document.querySelector('.cart-total');
  if (existing) existing.remove();

  const existingCheckoutButton = document.querySelector('.cart-checkout');
  if (existingCheckoutButton) existingCheckoutButton.remove();

  const total = calculateCartTotal(items);
  const totalEl = document.createElement('p');
  totalEl.classList.add('cart-total');
  totalEl.textContent = `Cart Total: $${total.toFixed(2)}`;
  document.querySelector('.product-list').insertAdjacentElement('afterend', totalEl);

  if (items.length > 0) {
    const checkoutLink = document.createElement('a');
    checkoutLink.classList.add('cart-checkout');
    checkoutLink.href = '../checkout/index.html';
    checkoutLink.textContent = 'Proceed to Checkout';
    totalEl.insertAdjacentElement('afterend', checkoutLink);
  }
}

document.querySelector('.product-list').addEventListener('click', (event) => {
  const removeButton = event.target.closest('.cart-card__remove');
  if (!removeButton) return;

  removeItemFromCart(removeButton.dataset.id);
});

renderCartContents();
