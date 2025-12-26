import { getProductById } from "./api.js";
import { formatCurrency } from "./utils.js";
import { addToCart } from "./cart-shared.js";

function printProductDetails(product) {
  document.title = `E-commerce | ${product.name}`;

  const productName = document.getElementById("product-name");
  const productNameMobile = document.getElementById("product-name-mobile");
  const productCategory = document.getElementById("product-category");
  const productPrice = document.getElementById("product-price");
  const productImage = document.getElementById("product-image");
  const productDescription = document.getElementById("product-description");
  const addToCartBtn = document.getElementById("add-to-cart");

  productName.textContent = product.title;
  productNameMobile.textContent = product.title;

  productCategory.textContent = product.cat_prefix;

  productPrice.textContent = formatCurrency(product.price);

  // productImage.src = product.img;
  productImage.src = "/assets/images/image-broken.jpg";
  productImage.alt = `${product.title} image`;

  productDescription.textContent = product.description;

  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
  });
}

(async function () {
  const loader = document.getElementById("loader");
  const container = document.getElementById("container");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  loader.style.display = "block";
  container.style.visibility = "hidden";
  const product = await getProductById(productId);
  if (!product) {
    location.replace("/pages/not-found.html");
    return;
  } else {
    printProductDetails(product);
    loader.style.display = "none";
    container.style.visibility = "visible";
  }
})();

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  history.back();
});
