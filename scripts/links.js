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





console.log("links.js chargé !");





let userID;

let links = [];





const titleInput =
document.querySelector("#link-title");


const urlInput =
document.querySelector("#link-url");


const addButton =
document.querySelector("#add-link");


const list =
document.querySelector("#links-list");


const message =
document.querySelector("#message");


const logout =
document.querySelector("#logout");









onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="../compte/connexion.html";

return;

}



userID=user.uid;



await loadLinks();



});








async function loadLinks(){


const pageRef =
doc(db,"pages",userID);



const page =
await getDoc(pageRef);




if(page.exists()){


links =
page.data().links || [];


}




displayLinks();


}









function displayLinks(){


list.innerHTML="";




if(links.length===0){


list.innerHTML =
"<p>Aucun lien ajouté.</p>";


return;


}





links.forEach((link,index)=>{



const div =
document.createElement("div");



div.className="link-item";



div.innerHTML=`

<div>

<strong>${link.title}</strong>

<br>

<a href="${link.url}" target="_blank">

${link.url}

</a>

</div>


<button data-id="${index}">
Supprimer
</button>

`;





div.querySelector("button")
.addEventListener("click",()=>{


deleteLink(index);


});





list.appendChild(div);



});



}









addButton.addEventListener("click",async()=>{



const title =
titleInput.value.trim();


const url =
urlInput.value.trim();




if(!title || !url){


message.textContent =
"❌ Remplis tous les champs.";


return;


}







links.push({

title:title,

url:url

});






await updateDoc(

doc(db,"pages",userID),

{

links:links

}

);






titleInput.value="";

urlInput.value="";



message.textContent =
"✅ Lien ajouté !";



displayLinks();



});









async function deleteLink(index){



links.splice(index,1);



await updateDoc(

doc(db,"pages",userID),

{

links:links

}

);



displayLinks();



}









logout.addEventListener("click",async(e)=>{


e.preventDefault();


await signOut(auth);


window.location.href="../compte/connexion.html";


});