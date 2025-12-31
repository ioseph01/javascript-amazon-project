import {cart} from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let cost = 0;
  let shippingCosts = 0;
 cart.forEach( cartItem => {
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
      <div class="js-summary-cart-quantity">Items (3):</div>
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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
 `;
 document.querySelector('.js-payment-summary').innerHTML = renderPaymentSummaryHTML;
}