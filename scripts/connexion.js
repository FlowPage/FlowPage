import { auth } from "./firebase.js";


import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const form = document.querySelector("form");


const errorMessage = document.querySelector("#error-message");





form.addEventListener("submit", async (e)=>{


    e.preventDefault();



    const email = document.querySelector("#email").value;


    const password = document.querySelector("#password").value;




    try{


        errorMessage.textContent="";



        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );



        window.location.href="../dashboard/index.html";


    }



    catch(error){



        console.error(error);



        switch(error.code){


            case "auth/invalid-credential":

                errorMessage.textContent =
                "❌ Email ou mot de passe incorrect.";

                break;



            case "auth/user-not-found":

                errorMessage.textContent =
                "❌ Aucun compte associé à cet email.";

                break;



            case "auth/wrong-password":

                errorMessage.textContent =
                "❌ Mot de passe incorrect.";

                break;



            default:

                errorMessage.textContent =
                "❌ Une erreur est survenue.";

        }



    }



});