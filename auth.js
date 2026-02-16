// ===== INIT SECOND ADMIN =====
(function initAdmins(){
let users = JSON.parse(localStorage.getItem("users")) || [];

if(!users.find(u=>u.username==="Viki Cavali")){
users.push({
username:"Viki Cavali",
password:"viki123",
role:"admin",
blocked:false,
bio:"",
image:"",
createdAt:new Date().toLocaleString()
});
localStorage.setItem("users",JSON.stringify(users));
}
})();

// ===== HELPERS =====
function getUsers(){
return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users){
localStorage.setItem("users",JSON.stringify(users));
}

function getCurrentUser(){
const username=localStorage.getItem("loggedUser");
if(!username) return null;
return getUsers().find(u=>u.username===username);
}

function logAction(text){
let logs = JSON.parse(localStorage.getItem("logs")) || [];
logs.push({
text,
date:new Date().toLocaleString()
});
localStorage.setItem("logs",JSON.stringify(logs));
}

// ===== REGISTER =====
function register(e){
e.preventDefault();

const username=document.getElementById("username").value.trim();
const password=document.getElementById("password").value.trim();
const role=document.getElementById("role").value;

let users=getUsers();

if(users.find(u=>u.username===username)){
showMsg("Съществува.");
return;
}

users.push({
username,
password,
role,
blocked:false,
bio:"",
image:"",
createdAt:new Date().toLocaleString()
});

saveUsers(users);
localStorage.setItem("loggedUser",username);
window.location="profile.html";
}

// ===== LOGIN =====
function login(e){
e.preventDefault();

let users=getUsers();

let user=users.find(u=>
u.username===document.getElementById("username").value &&
u.password===document.getElementById("password").value
);

if(!user){showMsg("Грешни данни.");return;}
if(user.blocked){showMsg("Блокиран.");return;}

localStorage.setItem("loggedUser",user.username);
window.location="profile.html";
}

function logout(){
localStorage.removeItem("loggedUser");
window.location="index.html";
}

function showMsg(msg){
document.getElementById("msg").innerText=msg;
}
