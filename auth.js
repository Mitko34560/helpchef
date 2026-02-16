function getUsers(){
return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users){
localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser(){
const username = localStorage.getItem("loggedUser");
if(!username) return null;
return getUsers().find(u=>u.username===username);
}

function register(e){
e.preventDefault();

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();
const role = document.getElementById("role").value;

let users = getUsers();

if(users.find(u=>u.username===username)){
showMsg("Потребителят съществува.");
return;
}

users.push({
username,
password,
role: username==="admin" ? "admin" : role,
blocked:false,
bio:"",
image:""
});

saveUsers(users);
localStorage.setItem("loggedUser", username);
window.location="profile.html";
}

function login(e){
e.preventDefault();

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();

let users = getUsers();
let user = users.find(u=>u.username===username && u.password===password);

if(!user){
showMsg("Грешни данни.");
return;
}

if(user.blocked){
showMsg("Акаунтът е блокиран.");
return;
}

localStorage.setItem("loggedUser", username);
window.location="profile.html";
}

function logout(){
localStorage.removeItem("loggedUser");
window.location="index.html";
}

function showMsg(msg){
document.getElementById("msg").innerText = msg;
}
