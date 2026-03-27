import { getParam, loadHeaderFooter, renderBreadcrumb } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const category = getParam('category');

await loadHeaderFooter();

if (category) {
  renderBreadcrumb(category);
}

await loadHeaderFooter();

if (category) {
  renderBreadcrumb(category);
}

if (!productId) {
  document.querySelector('.product-detail').innerHTML =
    '<p>Error: No product specified. Please select a product from the home page.</p>';
} else {
  const dataSource = new ProductData();
  const product = new ProductDetails(productId, dataSource);
  product.init();
}


