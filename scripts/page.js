import { db } from "./firebase.js";


import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const usernameElement = document.querySelector("#username");

const descriptionElement = document.querySelector("#description");

const linksElement = document.querySelector("#links");





// TEST : pseudo dans l'URL
// Exemple : page.html?user=david


const params = new URLSearchParams(window.location.search);

const username = params.get("user");



if(!username){

    usernameElement.textContent =
    "Aucune page trouvée";

    descriptionElement.textContent =
    "Aucun utilisateur spécifié.";

}

else{


try{


// Cherche le pseudo

const usernameDoc = await getDoc(
    doc(db,"usernames",username)
);



if(!usernameDoc.exists()){


usernameElement.textContent =
"Utilisateur introuvable";


throw new Error("Pseudo inexistant");

}




const uid = usernameDoc.data().uid;




// Récupération du profil

const userDoc = await getDoc(
    doc(db,"users",uid)
);




// Récupération de la page

const pageDoc = await getDoc(
    doc(db,"pages",uid)
);





if(userDoc.exists()){


const user = userDoc.data();


usernameElement.textContent =
user.username;


}




if(pageDoc.exists()){


const page = pageDoc.data();



descriptionElement.textContent =
page.description || "Bienvenue sur ma FlowPage";




const links = page.links || [];



links.forEach(link=>{


const button = document.createElement("a");


button.textContent = link.title;


button.href = link.url;


button.target="_blank";


linksElement.appendChild(button);


});



}



}



catch(error){

console.error(error);

}



}