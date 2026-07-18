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





console.log("customize.js chargé !");





let uid;



const titleInput =
document.querySelector("#title");


const descriptionInput =
document.querySelector("#description");


const backgroundInput =
document.querySelector("#background");


const saveButton =
document.querySelector("#save");


const message =
document.querySelector("#message");


const logout =
document.querySelector("#logout");









onAuthStateChanged(auth,async(user)=>{


if(!user){


window.location.href="../compte/connexion.html";

return;


}



uid=user.uid;



loadData();



});








async function loadData(){



const pageDoc =
await getDoc(

doc(db,"pages",uid)

);





if(pageDoc.exists()){


const data =
pageDoc.data();



titleInput.value =
data.title || "";



descriptionInput.value =
data.description || "";



backgroundInput.value =
data.background || "#FFFFFF";


}



}









saveButton.addEventListener("click",async()=>{



try{



await updateDoc(

doc(db,"pages",uid),

{


title:titleInput.value,

description:descriptionInput.value,

background:backgroundInput.value


}

);




message.textContent =
"✅ Modifications enregistrées !";



}

catch(error){


console.error(error);


message.textContent =
"❌ Erreur lors de l'enregistrement.";


}



});









logout.addEventListener("click",async(e)=>{


e.preventDefault();


await signOut(auth);


window.location.href="../compte/connexion.html";


});