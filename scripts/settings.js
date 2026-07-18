import { auth, db } from "./firebase.js";


import {

onAuthStateChanged,
verifyBeforeUpdateEmail,
updatePassword,
deleteUser,
signOut,
EmailAuthProvider,
reauthenticateWithCredential

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,
deleteDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";




console.log("settings.js chargé !");



let currentUser;



const currentEmail =
document.querySelector("#current-email");


const newEmail =
document.querySelector("#new-email");


const changeEmail =
document.querySelector("#change-email");


const emailMessage =
document.querySelector("#email-message");



const oldPassword =
document.querySelector("#old-password");


const newPassword =
document.querySelector("#new-password");


const confirmPassword =
document.querySelector("#confirm-password");


const changePassword =
document.querySelector("#change-password");


const passwordMessage =
document.querySelector("#password-message");



const deletePassword =
document.querySelector("#delete-password");


const deleteAccount =
document.querySelector("#delete-account");


const deleteMessage =
document.querySelector("#delete-message");


const logout =
document.querySelector("#logout");









onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="../compte/connexion.html";

return;

}


currentUser=user;


currentEmail.textContent =
user.email;


});









// Afficher / cacher mot de passe

document.querySelectorAll(".toggle-password")
.forEach(button=>{


button.addEventListener("click",()=>{


const input =
document.getElementById(
button.dataset.target
);



if(input.type==="password"){

input.type="text";


}else{


input.type="password";


}



});


});









async function verifyPassword(){


const credential =
EmailAuthProvider.credential(

currentUser.email,

oldPassword.value

);



await reauthenticateWithCredential(

currentUser,

credential

);


}









// Changement email

changeEmail.addEventListener("click",async()=>{


try{


await verifyBeforeUpdateEmail(

currentUser,

newEmail.value

);



emailMessage.textContent =
"✅ Vérification envoyée par e-mail.";



}


catch(error){


console.error(error);


emailMessage.textContent =
"❌ Impossible de modifier l'e-mail.";


}


});









// Changement mot de passe

changePassword.addEventListener("click",async()=>{


try{


if(newPassword.value.length < 6){

passwordMessage.textContent =
"❌ Minimum 6 caractères.";

return;

}



if(newPassword.value !== confirmPassword.value){


passwordMessage.textContent =
"❌ Les mots de passe ne correspondent pas.";

return;


}



await verifyPassword();



await updatePassword(

currentUser,

newPassword.value

);



passwordMessage.textContent =
"✅ Mot de passe modifié.";



}


catch(error){


console.error(error);


passwordMessage.textContent =
"❌ Ancien mot de passe incorrect.";


}



});









// Suppression compte

deleteAccount.addEventListener("click",async()=>{


if(!confirm(
"Supprimer définitivement votre compte ?"
)) return;



try{


await currentUser.reload();




const credential =
EmailAuthProvider.credential(

currentUser.email,

deletePassword.value

);





await reauthenticateWithCredential(

currentUser,

credential

);






await deleteDoc(
doc(db,"users",currentUser.uid)
);



await deleteDoc(
doc(db,"pages",currentUser.uid)
);



await deleteUser(currentUser);



window.location.href="../index.html";


}



catch(error){


console.error(
"Erreur suppression :",
error.code,
error.message
);



deleteMessage.textContent =
"❌ Mot de passe incorrect ou erreur Firebase.";


}



});









logout.addEventListener("click",async(e)=>{


e.preventDefault();


await signOut(auth);


window.location.href="../compte/connexion.html";


});