import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const cartItemsKey = 'so-cart';

function getCartItemImage(item) {
  return item.Images?.PrimaryMedium || item.Image || '';
}

function renderCartContents() {
  const cartItems = getLocalStorage(cartItemsKey) || [];
  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty</p>';
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
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
  const cartItems = getLocalStorage(cartItemsKey) || [];
  const updatedCartItems = cartItems.filter((item) => item.Id !== productId);
  localStorage.setItem(cartItemsKey, JSON.stringify(updatedCartItems));
  renderCartContents();
}

document.querySelector('.product-list').addEventListener('click', (event) => {
  const removeButton = event.target.closest('.cart-card__remove');
  if (!removeButton) return;

  removeItemFromCart(removeButton.dataset.id);
});

renderCartContents();
