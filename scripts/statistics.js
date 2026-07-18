import { auth, db } from "./firebase.js";


import {

onAuthStateChanged,
signOut

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,
getDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





console.log("statistics.js chargé !");





const views =
document.querySelector("#views");


const clicks =
document.querySelector("#clicks");


const created =
document.querySelector("#created");


const logout =
document.querySelector("#logout");








onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="../compte/connexion.html";

return;

}





try{



const pageDoc =
await getDoc(
doc(db,"pages",user.uid)
);



const userDoc =
await getDoc(
doc(db,"users",user.uid)
);






if(pageDoc.exists()){


const data =
pageDoc.data();


views.textContent =
data.views || 0;


clicks.textContent =
data.clicks || 0;


}







if(userDoc.exists()){


const data =
userDoc.data();



if(data.createdAt){


const date =
data.createdAt.toDate();


created.textContent =
date.toLocaleDateString("fr-FR");


}



}



}



catch(error){


console.error(error);


}



});









logout.addEventListener("click",async(e)=>{


e.preventDefault();


await signOut(auth);


window.location.href="../compte/connexion.html";


});