import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcHLwNkehrFg5YhGfC8fUBM825VEJoBeg",
  authDomain: "gomart-e29dc.firebaseapp.com",
  projectId: "gomart-e29dc",
  storageBucket: "gomart-e29dc.firebasestorage.app",
  messagingSenderId: "698488484607",
  appId: "1:698488484607:web:c52a3a54e9fadfb68fd2ca",
  measurementId: "G-Q6X76XDK7B",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;