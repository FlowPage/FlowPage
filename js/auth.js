import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function registerUser(email, password, username) {

  if (!username || !email || !password) {
    throw new Error("missing-fields");
  }

  // 1. Vérifier pseudo unique
  const userRef = doc(db, "usernames", username);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    throw new Error("username-taken");
  }

  // 2. Créer compte auth
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // 3. Sauvegarder username → uid
  await setDoc(doc(db, "usernames", username), {
    uid: userCred.user.uid
  });

  // 4. Créer user profile
  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    username,
    title: "",
    avatar: "",
    links: [],
    published: false
  });

  // 5. REDIRECTION CORRIGÉE
  window.location.href = "../dashboard/config.html";
}