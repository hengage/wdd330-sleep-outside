import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, qs } from './utils.mjs';

const category = getParam('category') || 'tents';
const dataSource = new ProductData();
const productList = new ProductList(category, dataSource, qs('.product-list'));

productList.init();
