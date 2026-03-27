import productData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new productData("tents");
const list = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, list);

productList.init();