# Week 04 Individual Validation Checklist

## 1. Success Page
- [x] Create `src/checkout/success.html`
- [x] Add shared header and footer placeholders
- [x] Add basic success confirmation content

## 2. Success Redirect
- [x] Redirect to `checkout/success.html` after a successful order
- [x] Keep cart clearing behavior on success

## 3. Custom Error Alert
- [x] Add `alertMessage(message, scroll = true)` to `src/js/utils.mjs`
- [x] Replace checkout failure `alert(...)` with the custom alert

## 4. Verification
- [ ] Confirm successful checkout redirects to the success page
- [ ] Confirm failed checkout shows the custom error alert
