import {cart} from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let cost = 0;
  let shippingCosts = 0;
 cart.cartItems.forEach( cartItem => {
  const product = getProduct(cartItem.productId);
  cost += product.priceCents * cartItem.quantity;
  shippingCosts += getDeliveryOption(cartItem.deliveryOptionID).priceCents;
 });   
 const totalBeforeTax = cost + shippingCosts;
 const estimatedTax = totalBeforeTax * 0.1;
 const total = estimatedTax + totalBeforeTax;

 const renderPaymentSummaryHTML = `
  <div class="payment-summary js-payment-summary">
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="js-summary-cart-quantity">Items (${cart.getCartQuantity()}):</div>
      <div class="payment-summary-money js-summary-cart-cost">$${formatCurrency(cost)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCosts)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="js-place-order place-order-button button-primary">
      Place your order
    </button>
  </div>
 `;
 document.querySelector('.js-payment-summary').innerHTML = renderPaymentSummaryHTML;
 document.querySelector('.js-place-order').addEventListener('click', async () => {
  try {
    const response = await fetch( 'https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({cart: cart
      })
    });
    const order = await response.json();
    console.log(order);
    addOrder(order);
  }
  catch (error) {
    console.log('Unexpected error. Try again later.');
  }
  window.location = 'orders.html'
 });
}