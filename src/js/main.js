import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { qs, loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData('tents');
const productList = new ProductList('tents', dataSource, qs('.product-list'));

productList.init();

// load dynamic header and footer
loadHeaderFooter();
