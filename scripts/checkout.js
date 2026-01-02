import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js'

Promise.all([
  loadProductsFetch(),

  new Promise(resolve => {
    loadCart(() => {
      resolve();
    })
  })

]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise(resolve => {
  loadProducts(() => {
    resolve('pass it on');
  })

}).then((value) => {
  console.log(value);

  return new Promise(resolve => {
    loadCart(() => {
      resolve('pass it on again');
    });
  })

}).then((value) => {
  console.log(value);

  renderOrderSummary();
  renderPaymentSummary();
});

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/