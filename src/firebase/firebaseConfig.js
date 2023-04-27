import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCINTsi5P-5XY09YORvi9KV-7BkW_rKGYw",
  authDomain: "my-ecommerce-9b54e.firebaseapp.com",
  projectId: "my-ecommerce-9b54e",
  storageBucket: "my-ecommerce-9b54e.appspot.com",
  messagingSenderId: "504577980145",
  appId: "1:504577980145:web:dcd288b8859fa662809b50",
  measurementId: "G-WL2JKHY1RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);