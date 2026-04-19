import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqBMIeFOkjlrTQWVbAK3QwgbbFa0KBHFE",
  authDomain: "flowpage-a1f0e.firebaseapp.com",
  projectId: "flowpage-a1f0e",
  storageBucket: "flowpage-a1f0e.firebasestorage.app",
  messagingSenderId: "549936871728",
  appId: "1:549936871728:web:03d28b432006004d9330f5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);