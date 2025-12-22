import { getAllUsers } from "./auth-shared.js";
import { defaultUsers } from "./data.js";

export function createDefaultUsers() {
  const allUsers = getAllUsers();

  if (allUsers.length === 0) {
    localStorage.setItem("allUsers", JSON.stringify(defaultUsers));
  }
}

export function formatCurrency(num) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(num));
}
