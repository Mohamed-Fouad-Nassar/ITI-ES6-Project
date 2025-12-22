// regex with validations
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const isValidEmail = (email) => (emailRegex.test(email) ? true : false);

const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
export const isValidName = (name) => (nameRegex.test(name) ? true : false);

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const isValidPassword = (password) =>
  passwordRegex.test(password) ? true : false;

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
  location.replace("/");
}

export function logOutUser() {
  localStorage.removeItem("loggedInUser");
  location.replace("/");
}
// ---------------------------
