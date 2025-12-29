export const cart = [];

function addToCart(productId) {
  let matchingItem;

  cart.forEach(
    cartItem => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    }
  );


  const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  if (matchingItem) {
    
    matchingItem.quantity += productQuantity;
  }
  else {
    cart.push(
      {
        productId: productId,
        quantity: productQuantity
      }
    );
  }
  updateCartQuantity();

}
