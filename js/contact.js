import { isValidEmail, isValidMsg, isValidName } from "./auth-shared.js";

const form = document.getElementById("contact-form");
const formErr = document.getElementById("form-err");

const email = document.getElementById("email");
const emailErr = document.getElementById("email-err");

const name = document.getElementById("name");
const nameErr = document.getElementById("name-err");

const subject = document.getElementById("sub");
const subErr = document.getElementById("sub-err");

const message = document.getElementById("message");
const msgErr = document.getElementById("msg-err");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  const data = {
    email: email.value.trim(),
    name: name.value.trim(),
    subject: subject.value.trim(),
    message: message.value.trim(),
  };

  [emailErr, nameErr, subErr, msgErr].forEach((el) => (el.textContent = ""));

  if (!isValidEmail(data.email)) {
    emailErr.textContent = "Please enter a valid email";
    isFormValid = false;
  }

  if (!isValidName(data.name)) {
    nameErr.textContent = "Please enter a valid name";
    isFormValid = false;
  }

  if (!isValidName(data.subject)) {
    subErr.textContent = "Please enter a valid subject";
    isFormValid = false;
  }

  if (!isValidMsg(data.message)) {
    msgErr.textContent = "Please enter a valid message";
    isFormValid = false;
  }

  if (isFormValid) console.log(data);
});
