import { products } from "./data.js";
import { formatCurrency } from "./utils.js";
import { handleCartAction } from "./cart-shared.js";

function printProductDetails(product) {
  document.title = `E-commerce | ${product.name}`;

  const productName = document.getElementById("product-name");
  const productNameMobile = document.getElementById("product-name-mobile");
  const productPrice = document.getElementById("product-price");
  const productImage = document.getElementById("product-image");
  const productDescription = document.getElementById("product-description");
  const addToCartBtn = document.getElementById("add-to-cart");

  productName.textContent = product.name;
  productNameMobile.textContent = product.name;

  productPrice.textContent = formatCurrency(product.price);

  // productImage.src = product.image;
  productImage.src = "/assets/products/product.webp";
  productImage.alt = `${product.name} image`;

  productDescription.textContent = product.description;

  addToCartBtn.addEventListener("click", () => {
    handleCartAction(product);
  });
}

(function () {
  // get product id and details
  const container = document.querySelector("main");
  container.style.visibility = "hidden";
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = products.find((product) => product.id == productId);
  if (!product) {
    location.replace("/pages/not-found.html");
    return;
  } else {
    printProductDetails(product);
    container.style.visibility = "visible";
  }
})();

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  history.back();
});
