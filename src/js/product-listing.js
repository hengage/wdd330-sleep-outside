import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter, qs, renderBreadcrumb } from './utils.mjs';

async function initPage() {
    await loadHeaderFooter();

    const category = getParam('category') || 'tents';
    const dataSource = new ProductData();
    const productList = new ProductList(category, dataSource, qs('.product-list'));

    const products = await productList.init();
    renderBreadcrumb(category, products.length);
}

initPage();
