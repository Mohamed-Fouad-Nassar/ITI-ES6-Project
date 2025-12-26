import { getProductsLimit } from "./api.js";
import { printProducts } from "./products-shared.js";

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// slider

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));

  slides[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

setInterval(nextSlide, 5000);

// products

const productsContainer = document.querySelector(".products");
const loader = document.getElementById("loader");

async function handlePrintProducts() {
  loader.style.display = "block";
  productsContainer.innerHTML = "";
  const products = await getProductsLimit(0, 8);
  printProducts(products, productsContainer);
  loader.style.display = "none";
}

handlePrintProducts();
