import { auth, db } from "./firebase.js";


import {

onAuthStateChanged,
signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,
getDoc,
updateDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";






console.log("dashboard.js chargé !");




const usernameElement =
document.querySelector("#username");


const logoutButton =
document.querySelector("#logout");










onAuthStateChanged(auth, async(user)=>{


if(!user){


window.location.href="../compte/connexion.html";


return;


}




try{



const userRef =
doc(db,"users",user.uid);



const userDoc =
await getDoc(userRef);





if(userDoc.exists()){


const data =
userDoc.data();





// Affichage pseudo

usernameElement.textContent =
data.username;







// Synchronisation email

if(data.email !== user.email){



await updateDoc(

userRef,

{

email:user.email

}

);



console.log(
"Email Firestore synchronisé !"
);



}




}



else{


usernameElement.textContent =
"Utilisateur";


}



}




catch(error){


console.error(
"Erreur dashboard :",
error
);



}



});









// Déconnexion

logoutButton.addEventListener(
"click",
async(e)=>{


e.preventDefault();



await signOut(auth);



window.location.href =
"../compte/connexion.html";



});