import {
  updateQty,
  clearCart,
  getCartItems,
  removeFromCart,
} from "./cart-shared.js";
import { formatCurrency } from "./utils.js";
import { getLoggedInUser } from "./auth-shared.js";

const loader = document.getElementById("loader");
const content = document.getElementById("content");
const cartItemsContainer = document.getElementById("cart-items");
const itemsCount = document.getElementById("itemsCount");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");
const clearCartBtn = document.getElementById("clear-cart");
const completeOrderBtn = document.getElementById("complete-order");

function printEmptyCart() {
  const div = document.createElement("div");
  div.classList.add("empty-cart");
  const emptyMsg = document.createElement("p");
  emptyMsg.textContent = "Your cart is empty";
  div.appendChild(emptyMsg);
  const productLink = document.createElement("a");
  productLink.classList.add("btn", "btn-primary");
  productLink.href = "../pages/products.html";
  productLink.textContent = "Browse products";
  div.appendChild(productLink);

  content.insertAdjacentElement("beforebegin", div);
  return;
}

function updateSummary() {
  const cartItems = getCartItems();
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  itemsCount.textContent = cartItems.length;
  subtotalEl.textContent = formatCurrency(subtotal);
  discountEl.textContent = formatCurrency(discount);
  totalEl.textContent = formatCurrency(total);
}

function printCartItems() {
  const cartItems = getCartItems();

  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    loader.style.display = "none";
    content.style.visibility = "hidden";
    printEmptyCart();
  } else {
    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const qty = document.createElement("p");
      qty.classList.add("qty");
      qty.textContent = `${item.quantity} ×`;
      cartItem.appendChild(qty);

      const image = document.createElement("div");
      image.classList.add("image");
      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.title;
      img.onerror = () => {
        img.src = "../assets/images/image-broken.jpg";
      };
      image.appendChild(img);
      cartItem.appendChild(image);

      const title = document.createElement("p");
      title.textContent = item.title;
      cartItem.appendChild(title);

      const btns = document.createElement("div");
      btns.classList.add("actions");

      const plusBtn = document.createElement("button");
      plusBtn.classList.add("btn-icon", "btn-primary");
      plusBtn.innerHTML = "<i class='fa fa-plus'></i>";
      plusBtn.addEventListener("click", () => {
        updateQty(item.id, 1);
        printCartItems();
      });
      btns.appendChild(plusBtn);

      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = formatCurrency(item.price * item.quantity);
      btns.appendChild(price);

      const minusBtn = document.createElement("button");
      minusBtn.classList.add("btn-icon", "btn-secondary");
      minusBtn.innerHTML = "<i class='fa fa-minus'></i>";
      minusBtn.addEventListener("click", () => {
        if (item.quantity > 1) updateQty(item.id, -1);
        else removeFromCart(item.id);
        printCartItems();
      });
      btns.appendChild(minusBtn);

      const delBtn = document.createElement("button");
      delBtn.classList.add("btn-icon", "btn-danger");
      delBtn.innerHTML = "<i class='fa fa-trash'></i>";
      delBtn.addEventListener("click", () => {
        removeFromCart(item.id);
        printCartItems();
      });
      btns.appendChild(delBtn);
      cartItem.appendChild(btns);

      cartItemsContainer.appendChild(cartItem);

      updateSummary();
    });

    loader.style.display = "none";
    content.style.visibility = "visible";
  }
}

loader.style.display = "block";
content.style.visibility = "hidden";
printCartItems();

clearCartBtn.addEventListener("click", () => {
  clearCart();
  printCartItems();
  content.style.visibility = "hidden";
});

const loggedInUser = getLoggedInUser();

if (!loggedInUser) completeOrderBtn.disabled = true;
completeOrderBtn.addEventListener("click", () => {
  if (loggedInUser) {
    clearCart();
    location.replace("../pages/success.html");
  } else alert("Please login to complete your order");
});
