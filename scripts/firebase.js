import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnsQiKFXd6DUUYGfs1hkIrqIB-UYMh4kY",
  authDomain: "flowpage-11cfc.firebaseapp.com",
  projectId: "flowpage-11cfc",
  storageBucket: "flowpage-11cfc.firebasestorage.app",
  messagingSenderId: "358008777070",
  appId: "1:358008777070:web:f33f6c72cdcdc9a411397f",
  measurementId: "G-P5GSFDRCFR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);