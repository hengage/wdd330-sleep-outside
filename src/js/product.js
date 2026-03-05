import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  const currentCart = getLocalStorage('so-cart') || [];
  const existingProductIndex = currentCart.findIndex(
    (item) => item.Id === product.Id,
  );

  if (existingProductIndex !== -1) {
    currentCart[existingProductIndex].qty++;
  } else {
    product.qty = 1;
    currentCart.push(product);
  }
  setLocalStorage('so-cart', currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
