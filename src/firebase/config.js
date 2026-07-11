import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Las credenciales se leen desde variables de entorno (.env) para no
// exponerlas en el repositorio. Ver .env.example para la lista de claves.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Instancia de Firestore reutilizada en toda la aplicacion.
export const db = getFirestore(app);

export default firebaseConfig;
