import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product)
        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }

    renderProductDetails(product) {
        document.querySelector('h3').textContent = product.Brand.Name;
        document.querySelector('h2').textContent = product.NameWithoutBrand;
        document.getElementById('product_img').src = product.Image;
        document.getElementById('product_img').alt = product.NameWithoutBrand;
        document.getElementsByClassName('product-card__price')[0].textContent = `Price: $${product.ListPrice}`;
        document.getElementsByClassName('product__color')[0].textContent = `Colors: ${product.Colors[0].ColorName}`;
        document.getElementsByClassName('product__description')[0].innerHTML = product.DescriptionHtmlSimple;

        document.getElementById('addToCart').dataset.productId = product.Id;
    }

    addProductToCart() {
        const cart = getLocalStorage('so-cart') || [];
        cart.push(this.product);
        setLocalStorage('so-cart', cart);
    }
}

