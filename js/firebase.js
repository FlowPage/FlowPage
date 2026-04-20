import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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