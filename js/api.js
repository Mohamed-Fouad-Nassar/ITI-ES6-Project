const description =
  "This product is designed to offer reliable performance and everyday convenience. Made with quality materials and attention to detail, it combines durability with a modern, practical design. Suitable for daily use, it delivers a balanced mix of functionality and comfort, making it a dependable choice for a wide range of needs.";

// Products
export async function getAllProducts() {
  return fetch("https://ecommerce-ts-backend-orcin.vercel.app/products")
    .then((res) => res.json())
    .then((products) => {
      return products.map((product) => ({
        ...product,
        description,
      }));
    })
    .catch((err) => err);
}

export async function getProductsLimit(start, limit) {
  return fetch(
    `https://ecommerce-ts-backend-orcin.vercel.app/products?_limit=${limit}&_start=${start}`
  )
    .then((res) => res.json())
    .then((products) => {
      return products.map((product) => ({
        ...product,
        description,
      }));
    })
    .catch((err) => err);
}

export async function getProductsByCategory(prefix) {
  return fetch(
    `https://ecommerce-ts-backend-orcin.vercel.app/products?cat_prefix=${prefix}`
  )
    .then((res) => res.json())
    .then((products) => {
      return products.map((product) => ({
        ...product,
        description,
      }));
    })
    .catch((err) => err);
}

export async function getProductById(id) {
  return fetch(`https://ecommerce-ts-backend-orcin.vercel.app/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      if (!Object.keys(product).length) return null;

      return {
        ...product,
        description,
      };
    })
    .catch((err) => err);
}

// Categories
export async function getAllCategories() {
  return fetch("https://ecommerce-ts-backend-orcin.vercel.app/categories")
    .then((res) => res.json())
    .catch((err) => err);
}
