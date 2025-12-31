export let cart = [];
loadStorage();

function loadStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
      {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2,
      deliveryOptionID: '1'
      },
      {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1, deliveryOptionID: '2'
      }
    ];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function findProduct(productId) {
  return cart.find(cartItem => cartItem.productId === productId);

}

export function addToCart(productId) {
  const matchingItem = findProduct(productId);

  const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  if (matchingItem) {
    
    matchingItem.quantity += productQuantity;
  }
  else {
    cart.push(
      {
        productId: productId,
        quantity: productQuantity,
        deliveryOptionID: '1'
      }
    );
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  cart.forEach( (cartItem, i) => {
    if (cartItem.productId === productId) {
      cart.splice(i,1);
    }
  });
  saveToStorage();
}

export function getCartQuantity() {
  let quantity = 0;
  cart.forEach(
    cartItem => {
      quantity += cartItem.quantity;
    }
  );
  return quantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  console.log('called');
  const matchingItem = findProduct(productId);
  matchingItem.deliveryOptionID = deliveryOptionId;
  saveToStorage();
  
}