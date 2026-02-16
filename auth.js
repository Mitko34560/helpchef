function register(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("user", JSON.stringify({username,password}));
    localStorage.setItem("loggedUser", username);

    window.location.href="profile.html";
}

function login(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const stored = JSON.parse(localStorage.getItem("user"));

    if(stored && stored.username === username && stored.password === password){
        localStorage.setItem("loggedUser", username);
        window.location.href="profile.html";
    }else{
        alert("Грешни данни");
    }
}

function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href="index.html";
}

document.addEventListener("DOMContentLoaded",()=>{
    const user = localStorage.getItem("loggedUser");

    if(user){
        const loginLink = document.getElementById("loginLink");
        const signupLink = document.getElementById("signupLink");
        const logoutBtn = document.getElementById("logoutBtn");

        if(loginLink) loginLink.style.display="none";
        if(signupLink) signupLink.style.display="none";
        if(logoutBtn) logoutBtn.style.display="inline-block";
    }
});
