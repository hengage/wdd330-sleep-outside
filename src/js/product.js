// Controller for the product detail page
// Handles loading and displaying a single product's details

import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Extract the product ID from the URL query string (e.g., ?product=880RR)
const productId = getParam('product');

// Create a data source for fetching tent product information from JSON
const dataSource = new ProductData('tents');

// Create and initialize the product details display with the product ID and data source
const product = new ProductDetails(productId, dataSource);
product.init();

