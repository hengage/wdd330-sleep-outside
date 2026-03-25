import { getLocalStorage, setLocalStorage } from './utils.mjs';

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.qty || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector, dataSource) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.dataSource = dataSource;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.FinalPrice * (item.qty || 1),
      0,
    );

    const subtotal = document.querySelector(`${this.outputSelector} #itemSubtotal`);
    if (subtotal) {
      subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    const itemCount = this.list.reduce((count, item) => count + (item.qty || 1), 0);
    this.tax = this.itemTotal * 0.06;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    const payload = {
      orderDate: new Date().toISOString(),
      ...json,
      items: packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2),
    };

    return this.dataSource.checkout(payload);
  }

  clearCart() {
    setLocalStorage(this.key, []);
    this.list = [];
  }
}
