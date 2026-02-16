// ===== Регистрация =====
function register(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.find(u => u.username === username)){
        alert("Това име вече съществува.");
        return;
    }

    const newUser = {
        username,
        password,
        bio: "",
        image: "",
        blocked: false,
        role: username === "admin" ? "admin" : "user"
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", username);

    window.location.href="profile.html";
}

// ===== Login =====
function login(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if(!user){
        alert("Грешни данни.");
        return;
    }

    if(user.blocked){
        alert("Този акаунт е блокиран.");
        return;
    }

    localStorage.setItem("loggedUser", username);
    window.location.href="profile.html";
}

// ===== Logout =====
function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href="index.html";
}

// ===== Проверка login =====
function getCurrentUser(){
    const username = localStorage.getItem("loggedUser");
    if(!username) return null;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(u => u.username === username);
}
