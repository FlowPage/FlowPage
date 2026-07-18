import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("creation.js chargé !");

const form = document.querySelector("form");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.querySelector("#username").value.trim().toLowerCase();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    errorMessage.textContent = "";

    try {

        console.log("Création du compte...");

        // Vérification du pseudo
        if (username.length < 3 || username.length > 20) {
            errorMessage.textContent =
                "❌ Le pseudo doit contenir entre 3 et 20 caractères.";
            return;
        }

        if (!/^[a-z0-9_.]+$/.test(username)) {
            errorMessage.textContent =
                "❌ Le pseudo ne peut contenir que des lettres, chiffres, '_' et '.'.";
            return;
        }

        // Vérification mot de passe
        if (password.length < 6) {
            errorMessage.textContent =
                "❌ Le mot de passe doit contenir au moins 6 caractères.";
            return;
        }

        // Vérifie si le pseudo existe
        const usernameRef = doc(db, "usernames", username);
        const usernameSnap = await getDoc(usernameRef);

        if (usernameSnap.exists()) {
            errorMessage.textContent =
                "❌ Ce pseudo est déjà utilisé.";
            return;
        }

        // Création du compte Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        console.log("Compte créé :", user.uid);

        // Réservation du pseudo
        await setDoc(usernameRef, {
            uid: user.uid
        });

        // Création du profil utilisateur
        await setDoc(
            doc(db, "users", user.uid),
            {
                username: username,
                email: email,
                createdAt: new Date(),
                theme: "default"
            }
        );

        // Création de la page FlowPage
        await setDoc(
            doc(db, "pages", user.uid),
            {
                title: username,
                description: "",
                links: [],
                background: "#FFFFFF",
                views: 0
            }
        );

        console.log("Page FlowPage créée !");

        window.location.href = "../dashboard/index.html";

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/email-already-in-use":
                errorMessage.textContent =
                    "❌ Cette adresse e-mail est déjà utilisée.";
                break;

            case "auth/invalid-email":
                errorMessage.textContent =
                    "❌ Adresse e-mail invalide.";
                break;

            case "auth/weak-password":
                errorMessage.textContent =
                    "❌ Le mot de passe est trop faible.";
                break;

            default:
                errorMessage.textContent =
                    "❌ Une erreur est survenue lors de la création du compte.";
        }

    }

});