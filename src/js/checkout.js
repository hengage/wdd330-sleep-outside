import ProductData from './ProductData.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.checkout-summary', new ProductData());
checkout.init();

const zipInput = document.querySelector('#zip');
if (zipInput) {
  zipInput.addEventListener('blur', () => {
    checkout.calculateOrderTotal();
  });
}

const form = document.querySelector('#checkout-form');
const message = document.querySelector('#checkout-message');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    try {
      const result = await checkout.checkout(form);
      checkout.clearCart();
      form.reset();
      checkout.init();
      if (message) {
        message.textContent =
          result?.message || 'Order submitted successfully.';
      }
    } catch (error) {
      if (message) {
        message.textContent = error.message || 'Checkout failed.';
      }
    }
  });
}
