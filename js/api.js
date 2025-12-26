const BASE_URL = "https://ecommerce-ts-backend-orcin.vercel.app";

const description =
  "This product is designed to offer reliable performance and everyday convenience. Made with quality materials and attention to detail, it combines durability with a modern, practical design. Suitable for daily use, it delivers a balanced mix of functionality and comfort, making it a dependable choice for a wide range of needs.";

// Products
export async function getAllProducts() {
  return fetch(`${BASE_URL}/products`)
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
  return fetch(`${BASE_URL}/products?_limit=${limit}&_start=${start}`)
    .then((res) => res.json())
    .then((products) => {
      return products.map((product) => ({
        ...product,
        description,
      }));
    })
    .catch((err) => err);
}

// export async function getProductsByCategory(prefix) {
//   return fetch(`${BASE_URL}/products${prefix ? `?cat_prefix=${prefix}` : ""}`)
//     .then((res) => res.json())
//     .then((products) => {
//       return products.map((product) => ({
//         ...product,
//         description,
//       }));
//     })
//     .catch((err) => err);
// }

export async function getFilteredSortedProducts(prefix, sort) {
  return fetch(`${BASE_URL}/products${prefix ? `?cat_prefix=${prefix}` : ""}`)
    .then((res) => res.json())
    .then((data) => {
      let products = data.map((product) => ({
        ...product,
        description,
      }));
      if (sort === "asc") return products.sort((a, b) => a.price - b.price);
      else if (sort === "desc")
        return products.sort((a, b) => b.price - a.price);
      else return products;
    })
    .catch((err) => err);
}

export async function getProductById(id) {
  return fetch(`${BASE_URL}/products/${id}`)
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
  return fetch(`${BASE_URL}/categories`)
    .then((res) => res.json())
    .catch((err) => err);
}
