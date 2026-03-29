import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter, qs, renderBreadcrumb } from './utils.mjs';

function clearStatusMessage() {
  const statusElement = qs('.products-status');
  if (statusElement) {
    statusElement.remove();
  }
}

function renderStatusMessage(message, isLoading = false) {
  clearStatusMessage();

  const productsSection = qs('.products');
  if (!productsSection) return;

  const statusElement = document.createElement('p');
  statusElement.className = 'products-status';
  if (isLoading) {
    statusElement.classList.add('products-status--loading');
  }

  statusElement.textContent = message;
  productsSection.append(statusElement);
}

function renderEmptySearchState(searchTerm) {
  clearStatusMessage();

  const productsSection = qs('.products');
  if (!productsSection) return;

  const emptyStateElement = document.createElement('div');
  emptyStateElement.className = 'products-empty-state';

  const messageElement = document.createElement('p');
  messageElement.className = 'products-status';
  messageElement.textContent = `No products found for "${searchTerm}".`;

  const homeLink = document.createElement('a');
  homeLink.className = 'products-empty-state__home-link';
  homeLink.href = '/index.html';
  homeLink.textContent = 'Go Back Home';

  emptyStateElement.append(messageElement, homeLink);
  productsSection.append(emptyStateElement);
}

function clearEmptySearchState() {
  const emptyStateElement = qs('.products-empty-state');
  if (emptyStateElement) {
    emptyStateElement.remove();
  }
}

async function initPage() {
  await loadHeaderFooter();

  const category = getParam('category');
  const search = getParam('search')?.trim();
  const dataSource = new ProductData();
  let productList = null;
  let products = [];
  if (search) {
    productList = new ProductList('', dataSource, qs('.product-list'), {
      title: `Search Results for "${search}"`,
      linkCategory: null,
    });

    productList.updateTitle();
    renderStatusMessage('Loading search results...', true);

    try {
      products = await dataSource.searchProducts(search);
      clearStatusMessage();
      clearEmptySearchState();

      if (!products.length) {
        productList.renderList([]);
        renderEmptySearchState(search);
        return;
      }

      productList.renderList(products);
      return;
    } catch (error) {
      productList.renderList([]);
      renderStatusMessage('Unable to load search results. Please try again.');
      return;
    }
  }

  const selectedCategory = category || 'tents';
  productList = new ProductList(
    selectedCategory,
    dataSource,
    qs('.product-list'),
  );

  renderStatusMessage('Loading products...', true);
  products = await productList.init();
  clearStatusMessage();
  renderBreadcrumb(selectedCategory, products.length);
}

initPage();
