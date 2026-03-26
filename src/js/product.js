import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');

if (!productId) {
  document.querySelector('.product-detail').innerHTML =
    '<p>Error: No product specified. Please select a product from the home page.</p>';
} else {
  const dataSource = new ProductData();
  const product = new ProductDetails(productId, dataSource);
  product.init();
}

// load dynamic header and footer
loadHeaderFooter();
