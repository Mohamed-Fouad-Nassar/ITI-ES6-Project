import { updateCartCounter } from "./shared.js";

export const getCartItems = () =>
  JSON.parse(localStorage.getItem("cart")) || [];

export function isInCart(productId) {
  const cartItems = getCartItems();
  return cartItems.find((item) => item.id === productId);
}

export function addToCart(product) {
  const cartItems = getCartItems();
  if (isInCart(product.id)) {
    cartItems.forEach((item) => {
      if (item.id === product.id) item.quantity += 1;
    });
  } else cartItems.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCounter();
}

export function removeFromCart(productId) {
  const cartItems = getCartItems();
  const newCartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCartItems));
  updateCartCounter();
}

export function updateQty(productId, change) {
  const cartItems = getCartItems();
  cartItems.forEach((item) => {
    if (item.id === productId) item.quantity += change;
  });
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCounter();
}

export function clearCart() {
  localStorage.removeItem("cart");
  updateCartCounter();
}

export function getCartItemsCount() {
  const cartItems = getCartItems();
  return cartItems.length;
}

export function getCartItemsTotalQty() {
  const cartItems = getCartItems();
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}
