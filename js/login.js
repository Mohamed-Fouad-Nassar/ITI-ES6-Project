import {
  logInUser,
  isUserExists,
  isValidEmail,
  getLoggedInUser,
  isValidPassword,
  isCredentialValid,
} from "./auth-shared.js";

import { applyTheme } from "./theme.js";
applyTheme();

const form = document.getElementById("login-form");
const formErr = document.getElementById("form-err");

const email = document.getElementById("email");
const emailErr = document.getElementById("email-err");

const password = document.getElementById("password");
const passErr = document.getElementById("pass-err");

// submit login form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  const data = {
    email: email.value.trim(),
    pass: password.value,
  };

  [emailErr, passErr].forEach((el) => (el.textContent = ""));

  if (!isValidEmail(data.email)) {
    emailErr.textContent = "Please enter a valid email";
    isFormValid = false;
  }

  if (!isValidPassword(data.pass)) {
    passErr.textContent = "Please enter a valid password";
    isFormValid = false;
  }

  if (isFormValid) login(data.email, data.pass);
});

// login function
function login(email, password) {
  formErr.textContent = "";

  if (isUserExists(email)) {
    const user = isCredentialValid(email, password);

    if (user) logInUser(user);
    else formErr.textContent = "Invalid credentials";
  } else formErr.textContent = "User does not exist";
}

// check if user is logged in redirect from auth pages
const loggedInUser = getLoggedInUser();
if (loggedInUser) location.replace("../index.html");
