import { createDefaultUsers } from "./utils.js";
import { getCartItemsTotalQty } from "./cart-shared.js";
import { getLoggedInUser, logOutUser } from "./auth-shared.js";

// header menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");
const auth = document.getElementById("auth");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  auth.classList.toggle("active");
});

// header cart counter
export function updateCartCounter() {
  const cartCounter = document.getElementById("cart-count");
  let cartItemsCount = getCartItemsTotalQty();
  if (cartItemsCount) cartCounter.textContent = cartItemsCount;
  else cartCounter.textContent = "";
}
updateCartCounter();
// create default users
createDefaultUsers();

// go up Button
const goUpBtn = document.createElement("button");
goUpBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
goUpBtn.classList.add("btn", "btn-primary", "go-up");
goUpBtn.style.display = "none";

document.addEventListener("scroll", () => {
  if (window.scrollY > 500) goUpBtn.style.display = "block";
  else goUpBtn.style.display = "none";
});

goUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

document.body.appendChild(goUpBtn);
// ----------------------------

// check if user is logged in or not and change dom
const noUser = document.getElementById("no-user");
const username = document.getElementById("username");
const userProfile = document.getElementById("user-profile");

const loggedInUser = getLoggedInUser();

if (loggedInUser) {
  userProfile.style.display = "flex";
  username.textContent = loggedInUser.name;
} else noUser.style.display = "flex";

// logout btn
const logoutBtn = document.getElementById("log-out");
logoutBtn.addEventListener("click", () => {
  logOutUser();
});
