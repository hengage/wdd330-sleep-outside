# Checkout Checklist

## 1. Cart To Checkout Flow
- [x] Add a checkout button on the cart page
- [x] Link the cart page to `checkout/index.html`

## 2. Checkout Page UI
- [x] Add the checkout form markup to `src/checkout/index.html`
- [x] Add an order summary section to the checkout page
- [x] Ensure the checkout page uses the shared header and footer

## 3. Checkout Logic
- [x] Create a checkout process module
- [x] Load cart items into the checkout summary
- [x] Calculate order totals
- [x] Capture customer form values
- [x] Build the order payload

## 4. API Integration
- [x] Add support for submitting an order to the backend API
- [x] Handle successful order submission
- [x] Handle failed order submission

## 5. Verification
- [ ] Verify checkout page loads from the cart page
- [ ] Verify the order summary reflects cart contents
- [ ] Verify totals calculate correctly
- [ ] Verify checkout submission behavior
