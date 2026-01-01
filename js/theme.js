const root = document.documentElement;

export function applyTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    if (savedTheme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) root.setAttribute("data-theme", "dark");
  }
}

export function toggleTheme() {
  const currentTheme = root.getAttribute("data-theme");

  if (currentTheme === "dark") {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

export function getCurrentTheme() {
  return root.getAttribute("data-theme") || "light";
}
