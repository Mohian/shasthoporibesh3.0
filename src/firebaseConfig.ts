// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAW8oSW-Wl9h_EAaBD81X8ygBiAyxrUyR4",
  authDomain: "shasthoporibesh-d5307.firebaseapp.com",
  projectId: "shasthoporibesh-d5307",
  storageBucket: "shasthoporibesh-d5307.firebasestorage.app",
  messagingSenderId: "1012850658590",
  appId: "1:1012850658590:web:e3c4dc5a1289f22246cd0f",
  measurementId: "G-ZYK0SGD9DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
