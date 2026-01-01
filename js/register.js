import {
  cleanName,
  isValidName,
  isUserExists,
  isValidEmail,
  createNewUser,
  getLoggedInUser,
  isValidPassword,
} from "./auth-shared.js";

import { applyTheme } from "./theme.js";
applyTheme();

const form = document.getElementById("register-form");
const formErr = document.getElementById("form-err");

const name = document.getElementById("name");
const nameErr = document.getElementById("name-err");

const email = document.getElementById("email");
const emailErr = document.getElementById("email-err");

const password = document.getElementById("password");
const passErr = document.getElementById("pass-err");

const confirmPassword = document.getElementById("confirm-password");
const confirmPassErr = document.getElementById("confirm-pass-err");

// submit register form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  const data = {
    name: cleanName(name.value),
    email: email.value.trim(),
    pass: password.value,
    confirmPass: confirmPassword.value,
  };

  [nameErr, emailErr, passErr, confirmPassErr].forEach(
    (el) => (el.textContent = "")
  );

  console.log(data.name);

  if (!isValidName(data.name)) {
    nameErr.textContent = "Please enter your name";
    isFormValid = false;
  }

  if (!isValidEmail(data.email)) {
    emailErr.textContent = "Please enter a valid email";
    isFormValid = false;
  }

  if (!isValidPassword(data.pass)) {
    passErr.textContent =
      "Please enter a valid password, at least 8 characters, contains numbers, lowercase and uppercase letters, and special characters";
    isFormValid = false;
  }

  if (data.confirmPass === "") {
    confirmPassErr.textContent = "Please repeat your password";
    isFormValid = false;
  }
  if (data.pass !== data.confirmPass) {
    confirmPassErr.textContent = "Passwords do not match";
    isFormValid = false;
  }

  if (isFormValid) register(data.name, data.email, data.pass);
});

// register function
function register(name, email, password) {
  formErr.textContent = "";

  if (isUserExists(email)) {
    formErr.textContent = "User already exists";
    return;
  }

  createNewUser(name, email, password);
}

// check if user is logged in redirect from auth pages
const loggedInUser = getLoggedInUser();
if (loggedInUser) location.replace("../index.html");
