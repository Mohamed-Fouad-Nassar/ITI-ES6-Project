// regex with validations
const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmail = (email) => emailRgx.test(email);

const nameRgx = /^[a-zA-Z\s\-']{2,50}$/;
export const cleanName = (name) =>
  name.replace(/[\u200E\u200F\u202A-\u202E]/g, "").trim();
export const isValidName = (name) => nameRgx.test(name);

const passwordRgx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const isValidPassword = (password) =>
  passwordRgx.test(password) ? true : false;

const msgRgx = /^[a-zA-Z0-9\s\.\-]{2,200}$/;
export const isValidMsg = (msg) => msgRgx.test(msg);
// -------------------------

// users and local storage handlers
export const getAllUsers = () =>
  JSON.parse(localStorage.getItem("allUsers")) || [];

export let getLoggedInUser = () =>
  JSON.parse(localStorage.getItem("loggedInUser"));

export function isUserExists(email) {
  const allUsers = getAllUsers();
  return allUsers.find((user) => user.email === email);
}

export function isCredentialValid(email, password) {
  const allUsers = getAllUsers();
  return allUsers.find(
    (user) => user.email === email && user.password === password
  );
}

export function createNewUser(name, email, password) {
  const allUsers = getAllUsers();
  allUsers.push({ name, email, password });
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  logInUser({ name, email, password });
}

export function logInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  location.replace("../index.html");
}

export function logOutUser() {
  localStorage.removeItem("loggedInUser");
  const pathname = location.pathname;

  pathname.includes("/index.html") || pathname === "/ITI-ES6-Project/"
    ? location.reload()
    : location.replace("../index.html");
}
// ---------------------------
