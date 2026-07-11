import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc
} from "firebase/firestore";
import { db } from "../firebase/config";

// Datos mock como fallback
import products from "./products.js";

const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true";

// Funcion para poblar Firebase con productos (ejecutar una sola vez)
export const seedFirestore = async () => {
  try {
    const productsCol = collection(db, "products");
    for (const product of products) {
      await addDoc(productsCol, {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image
      });
    }
    console.log("Productos cargados en Firestore exitosamente");
    return true;
  } catch (error) {
    console.error("Error al cargar productos en Firestore:", error);
    return false;
  }
};

// Solo en desarrollo: permite ejecutar seedFirestore() desde la consola del
// navegador una unica vez para poblar la coleccion "products".
if (import.meta.env.DEV) {
  window.seedFirestore = seedFirestore;
}

export const getProducts = async () => {
  if (!useFirebase) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    });
  }

  try {
    const productsCol = collection(db, "products");
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return productList;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    // Fallback a datos mock
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    });
  }
};

export const getProductsByCategory = async (categoryId) => {
  if (!useFirebase) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = products.filter(
          (product) => product.category === categoryId
        );
        resolve(filtered);
      }, 1000);
    });
  }

  try {
    const productsCol = collection(db, "products");
    const q = query(productsCol, where("category", "==", categoryId));
    const querySnapshot = await getDocs(q);
    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return productList;
  } catch (error) {
    console.error("Error al obtener productos por categoria:", error);
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = products.filter(
          (product) => product.category === categoryId
        );
        resolve(filtered);
      }, 1000);
    });
  }
};

export const getProductById = async (id) => {
  if (!useFirebase) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find((p) => p.id === Number(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Producto no encontrado"));
        }
      }, 1000);
    });
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find((p) => p.id === Number(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Producto no encontrado"));
        }
      }, 1000);
    });
  }
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
