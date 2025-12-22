import { products } from "./data.js";
import { handleCartAction } from "./cart-shared.js";

const productsContainer = document.querySelector(".products");

function printProducts(products) {
  products.forEach((product) => {
    const article = document.createElement("article");

    // product image
    const img = document.createElement("img");
    // img.src = product.image;
    img.src = "/assets/products/product.webp";
    img.alt = product.name;
    article.appendChild(img);

    // product details
    const div = document.createElement("div");
    // product name
    const h3 = document.createElement("h3");
    h3.textContent = product.name;
    div.appendChild(h3);

    // product details
    const p = document.createElement("p");
    p.textContent = product.description;
    div.appendChild(p);

    // buttons
    const btns = document.createElement("div");
    btns.classList.add("buttons");
    // details button
    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add("btn", "btn-secondary");
    detailsBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
    detailsBtn.addEventListener("click", () => {
      openProductDetails(product.id);
    });
    btns.appendChild(detailsBtn);
    // cart button
    const cartBtn = document.createElement("button");
    cartBtn.classList.add("btn", "btn-primary");
    cartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to card';
    cartBtn.addEventListener("click", () => {
      handleCartAction(product.id);
    });
    btns.appendChild(cartBtn);

    div.appendChild(btns);

    article.appendChild(div);

    productsContainer.appendChild(article);
  });
}

printProducts(products);

function openProductDetails(productId) {
  const product = products.find((product) => product.id === productId);

  if (product) {
    window.location.href = `/pages/product.html?id=${productId}`;
  }
}
