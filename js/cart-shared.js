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
}

export function removeFromCart(productId) {
  const cartItems = getCartItems();
  const newCartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCartItems));
}

export function updateQty(productId, change) {
  const cartItems = getCartItems();
  cartItems.forEach((item) => {
    if (item.id === productId) item.quantity += change;
  });
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function printCartItemsCounter() {
  const cartItems = getCartItems();
  return cartItems.length;
}
