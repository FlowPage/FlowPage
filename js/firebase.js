import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwC89G-DhbW-1305hDfZ0JDRjAPv9h05s",
  authDomain: "flow2-da6aa.firebaseapp.com",
  projectId: "flow2-da6aa",
  storageBucket: "flow2-da6aa.firebasestorage.app",
  messagingSenderId: "691297518888",
  appId: "1:691297518888:web:d94c4a653259151c89fc1d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);