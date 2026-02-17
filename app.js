import { auth, db } from "./firebase.js";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// REGISTER
window.registerUser = async function(){
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

await createUserWithEmailAndPassword(auth, email, password);
window.location="dashboard.html";
};

// LOGIN
window.loginUser = async function(){
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

await signInWithEmailAndPassword(auth, email, password);
window.location="dashboard.html";
};

// LOGOUT
window.logoutUser = async function(){
await signOut(auth);
window.location="index.html";
};

// ADD RECIPE
window.addRecipe = async function(){
const user = auth.currentUser;
if(!user) return;

await addDoc(collection(db,"recipes"),{
title:document.getElementById("title").value,
description:document.getElementById("description").value,
author:user.email
});

loadRecipes();
};

// DELETE RECIPE
window.deleteRecipe = async function(id){
await deleteDoc(doc(db,"recipes",id));
loadRecipes();
};

// LOAD RECIPES
async function loadRecipes(){
const snapshot = await getDocs(collection(db,"recipes"));
let container=document.getElementById("recipesContainer");
if(!container) return;

container.innerHTML="";

snapshot.forEach(d=>{
let r=d.data();
container.innerHTML+=`
<div class="card">
<h3>${r.title}</h3>
<p>${r.description}</p>
<p class="author">${r.author}</p>
<button onclick="deleteRecipe('${d.id}')">Delete</button>
</div>
`;
});
}

window.onload=loadRecipes;

import { sendPasswordResetEmail }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// RESET PASSWORD
window.resetPassword = async function(){
const email = document.getElementById("email").value;

try{
await sendPasswordResetEmail(auth, email);
document.getElementById("message").innerText =
"Провери имейла си за линк.";
}
catch(error){
document.getElementById("message").innerText =
"Невалиден имейл.";
}
};
