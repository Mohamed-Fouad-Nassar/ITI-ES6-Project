import {
  getAllProducts,
  getAllCategories,
  getFilteredSortedProducts,
} from "./api.js";
import { printProducts } from "./products-shared.js";

const productsContainer = document.querySelector(".products");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const loader = document.getElementById("loader");

async function handlePrintProducts(callback) {
  loader.style.display = "block";
  productsContainer.innerHTML = "";
  const products = await callback();
  console.log(products);
  printProducts(products, productsContainer);
  loader.style.display = "none";
}

// render all products
handlePrintProducts(getAllProducts);

// get categories and filter
async function handleGetCategories(callback) {
  filter.setAttribute("disabled", true);
  const categories = await callback();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title;
    option.textContent = category.title;
    filter.appendChild(option);
  });
  filter.removeAttribute("disabled");
}
handleGetCategories(getAllCategories);
filter.addEventListener("change", (e) => {
  handlePrintProducts(() =>
    getFilteredSortedProducts(e.target.value, sort.value)
  );
});

// sort products
sort.addEventListener("change", (e) => {
  handlePrintProducts(() =>
    getFilteredSortedProducts(filter.value, e.target.value)
  );
});
