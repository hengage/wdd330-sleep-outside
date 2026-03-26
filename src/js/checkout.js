import ProductData from './ProductData.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function validateExpirationDate(input) {
  const value = input.value.trim();

  if (!value) {
    input.setCustomValidity('');
    return;
  }

  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    input.setCustomValidity('Enter the expiration date in MM/YY format.');
    return;
  }

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (
    month < 1 ||
    month > 12 ||
    year < currentYear ||
    (year === currentYear && month < currentMonth)
  ) {
    input.setCustomValidity('Enter an expiration date that is not in the past.');
    return;
  }

  input.setCustomValidity('');
}

const checkout = new CheckoutProcess('so-cart', '.checkout-summary', new ProductData());
checkout.init();

const zipInput = document.querySelector('#zip');
if (zipInput) {
  zipInput.addEventListener('blur', () => {
    checkout.calculateOrderTotal();
  });
}

const expirationInput = document.querySelector('#expiration');
if (expirationInput) {
  expirationInput.addEventListener('input', () => {
    validateExpirationDate(expirationInput);
  });

  expirationInput.addEventListener('blur', () => {
    validateExpirationDate(expirationInput);
  });
}

const form = document.querySelector('#checkout-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (expirationInput) {
      validateExpirationDate(expirationInput);
    }

    if (!form.reportValidity()) return;

    try {
      const result = await checkout.checkout(form);
      checkout.clearCart();
      form.reset();
      checkout.init();
      alert(result?.message || 'Order submitted successfully.');
    } catch (error) {
      alert(error.message || 'Checkout failed.');
    }
  });
}
