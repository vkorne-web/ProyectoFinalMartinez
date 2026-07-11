import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true";

// Genera un documento en la coleccion "orders" de Firestore con los datos
// de la compra y devuelve el id de la orden creada.
export const createOrder = async (order) => {
  if (!useFirebase) {
    // Modo demo (sin Firebase configurado): simula la creacion de la orden
    // para que la app funcione al clonarla sin credenciales.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("DEMO-" + order.buyer.name.slice(0, 3).toUpperCase() + "-0001");
      }, 800);
    });
  }

  const ordersCol = collection(db, "orders");
  const docRef = await addDoc(ordersCol, {
    ...order,
    date: serverTimestamp()
  });
  return docRef.id;
};
