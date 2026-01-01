export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) { 
    this.#localStorageKey = localStorageKey;
    this.#loadStorage();
  }

  #loadStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
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

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  findProduct(productId) {
    return this.cartItems.find(cartItem => cartItem.productId === productId);

  }

  addToCart(productId) {
    const matchingItem = this.findProduct(productId);

    const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    }
    else {
      this.cartItems.push(
        {
          productId: productId,
          quantity: productQuantity,
          deliveryOptionID: '1'
        }
      );
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems.forEach( (cartItem, i) => {
      if (cartItem.productId === productId) {
        this.cartItems.splice(i,1);
      }
    });
    this.saveToStorage();
  }

  getCartQuantity() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }


  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.findProduct(productId);
    matchingItem.deliveryOptionID = deliveryOptionId;
    this.saveToStorage();
  }
  
};

export const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');
console.log(cart.cartItems);

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

