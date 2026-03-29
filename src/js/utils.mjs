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

export function getCartItems(key = 'so-cart') {
  return getLocalStorage(key) || [];
}

export function setCartItems(items, key = 'so-cart') {
  setLocalStorage(key, items);
  updateCartCount();
}

export function getCartCount(key = 'so-cart') {
  const cartItems = getCartItems(key);
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

export function alertMessage(message, scroll = true) {
  let alertElement = document.querySelector('.alert-message');

  if (!alertElement) {
    alertElement = document.createElement('p');
    alertElement.classList.add('alert-message');
    alertElement.setAttribute('role', 'alert');

    const checkoutMessage = document.querySelector('#checkout-message');
    const mainElement = document.querySelector('main');

    if (checkoutMessage) {
      checkoutMessage.replaceWith(alertElement);
    } else if (mainElement) {
      mainElement.prepend(alertElement);
    } else {
      document.body.prepend(alertElement);
    }
  }

  alertElement.textContent = message;

  if (scroll) {
    alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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

export function initSearchForm() {
  const searchForm = document.querySelector('#site-search-form');
  if (!searchForm || searchForm.dataset.initialized === 'true') return;

  searchForm.dataset.initialized = 'true';
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchInput = searchForm.querySelector('input[name="search"]');
    const searchValue = searchInput?.value?.trim();
    if (!searchValue) return;

    const targetUrl = `/product_listing/index.html?search=${encodeURIComponent(searchValue)}`;
    window.location.assign(targetUrl);
  });
}

export function formatCategoryName(category) {
  if (!category) return '';

  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function renderBreadcrumb(category, itemCount = null) {
  const headerElement = document.querySelector('#main-header');
  if (!headerElement || !category) return;

  const formattedCategory = formatCategoryName(category);
  const hasItemCount = Number.isInteger(itemCount) && itemCount >= 0;
  const itemLabel = itemCount === 1 ? 'item' : 'items';
  const categoryUrl = `/product_listing/index.html?category=${encodeURIComponent(category)}`;

  let breadcrumbElement = document.querySelector('.breadcrumb');
  if (!breadcrumbElement) {
    breadcrumbElement = document.createElement('nav');
    breadcrumbElement.className = 'breadcrumb';
    breadcrumbElement.setAttribute('aria-label', 'Breadcrumb');
    headerElement.insertAdjacentElement('afterend', breadcrumbElement);
  }

  // Clear existing content
  breadcrumbElement.textContent = '';

  // Create and append the category link safely
  const linkElement = document.createElement('a');
  linkElement.href = categoryUrl;
  linkElement.textContent = formattedCategory;
  breadcrumbElement.appendChild(linkElement);

  // Optionally append the item count
  if (hasItemCount) {
    breadcrumbElement.appendChild(document.createTextNode(' '));

    const countSpan = document.createElement('span');
    countSpan.textContent = `-> (${itemCount} ${itemLabel})`;
    breadcrumbElement.appendChild(countSpan);
  }
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
    initSearchForm();
  }
  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}
