// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCartCount(key = 'so-cart') {
  const cartItems = getLocalStorage(key) || [];
  return cartItems.length;
}

export function renderCartCountBadge(count) {
  const cartLink = document.querySelector('.cart a');
  if (!cartLink) return;

  const existingBadge = cartLink.querySelector('.cart-count');
  if (count <= 0) {
    if (existingBadge) existingBadge.remove();
    return;
  }

  if (existingBadge) {
    existingBadge.textContent = count;
    return;
  }

  const badge = document.createElement('span');
  badge.classList.add('cart-count');
  badge.textContent = count;
  cartLink.appendChild(badge);
}

export function updateCartCount() {
  const count = getCartCount();
  renderCartCountBadge(count);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// extract parameter from URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render list with template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// render with template (single template)
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// load template from file
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// load header and footer
export async function loadHeaderFooter() {
  // load templates
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');

  // get placeholder elements
  const headerElement = document.querySelector('#main-header');
  const footerElement = document.querySelector('#main-footer');

  // render templates
  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
    updateCartCount();
  }
  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}
