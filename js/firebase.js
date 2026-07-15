import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjwQyIsEzfPS02IuvpkWDWYC8_EvgFatQ",
  authDomain: "flowpage-fa13c.firebaseapp.com",
  projectId: "flowpage-fa13c",
  storageBucket: "flowpage-fa13c.firebasestorage.app",
  messagingSenderId: "294883912905",
  appId: "1:294883912905:web:f62e3e3f942b19a502f118",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);