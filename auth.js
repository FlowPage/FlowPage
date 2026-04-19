import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function registerUser(email, password, username) {

  // 1. Vérifier pseudo unique
  const userRef = doc(db, "usernames", username);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
  throw new Error("username-taken");
}

  // 2. Créer compte email/password
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // 3. Sauvegarder pseudo
  await setDoc(doc(db, "usernames", username), {
    uid: userCred.user.uid
  });

  // 4. Sauvegarder user
  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    username
  });

  // 5. Redirection future page config
  window.location.href = "../config.html";
}