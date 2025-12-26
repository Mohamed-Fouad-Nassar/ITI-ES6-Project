import { formatCurrency } from "./utils.js";
import { addToCart } from "./cart-shared.js";

const pathname = window.location.pathname;
console.log(pathname);

export function printProducts(products, container) {
  if (products.length === 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "No products found";
    container.appendChild(h2);
    return;
  }

  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product");

    // product image
    const img = document.createElement("img");
    img.src = product.img;
    // img.src = "/assets/products/product.webp";
    img.alt = product.title;
    img.onerror = () => {
      img.src = `${
        pathname === "/" ? "" : "../"
      }assets/images/image-broken.jpg`;
      console.log(img.src);
    };
    article.appendChild(img);

    // product details
    const div = document.createElement("div");
    // product name
    const h3 = document.createElement("h3");
    h3.textContent = product.title;
    div.appendChild(h3);
    // category name
    const span = document.createElement("span");
    span.textContent = product.cat_prefix;
    div.appendChild(span);

    // product details
    const p = document.createElement("p");
    p.textContent = product.description;
    div.appendChild(p);

    const h4 = document.createElement("h4");
    h4.textContent = formatCurrency(product.price);
    div.appendChild(h4);

    // buttons
    const btns = document.createElement("div");
    btns.classList.add("buttons");
    // details button
    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add("btn", "btn-secondary");
    detailsBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
    detailsBtn.addEventListener("click", () => {
      window.location.href = `/pages/product.html?id=${product.id}`;
    });
    btns.appendChild(detailsBtn);
    // cart button
    const cartBtn = document.createElement("button");
    cartBtn.classList.add("btn", "btn-primary");
    cartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to card';
    cartBtn.addEventListener("click", () => {
      addToCart(product);
    });
    btns.appendChild(cartBtn);

    div.appendChild(btns);

    article.appendChild(div);

    container.appendChild(article);
  });
}
