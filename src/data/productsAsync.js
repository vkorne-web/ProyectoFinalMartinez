import products from "./products.js";

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export const getProductsByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter(
        (product) => product.category === categoryId
      );
      resolve(filtered);
    }, 1000);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, 1000);
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "electronica", name: "Electronica" },
        { id: "ropa", name: "Ropa" },
        { id: "hogar", name: "Hogar" },
        { id: "deportes", name: "Deportes" }
      ]);
    }, 500);
  });
};
