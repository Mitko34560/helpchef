// ===== Helpers =====
function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users){
    localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser(){
    const username = localStorage.getItem("loggedUser");
    if(!username) return null;
    return getUsers().find(u => u.username === username);
}

// ===== Register =====
function register(event){
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username.length < 3){
        showMsg("Минимум 3 символа за име.");
        return;
    }

    if(password.length < 4){
        showMsg("Минимум 4 символа за парола.");
        return;
    }

    let users = getUsers();

    if(users.find(u => u.username === username)){
        showMsg("Това име вече съществува.");
        return;
    }

    users.push({
        username: username,
        password: password,
        role: username === "admin" || username === "Viki Cavali" ? "admin" : "user",
        blocked: false,
        bio: "",
        image: "",
        createdAt: new Date().toLocaleString()
    });

    saveUsers(users);
    localStorage.setItem("loggedUser", username);

    window.location.href = "profile.html";
}

// ===== Login =====
function login(event){
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = getUsers();
    let user = users.find(u => u.username === username && u.password === password);

    if(!user){
        showMsg("Грешни данни.");
        return;
    }

    if(user.blocked){
        showMsg("Този акаунт е блокиран.");
        return;
    }

    localStorage.setItem("loggedUser", user.username);
    window.location.href = "profile.html";
}

function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}

function showMsg(msg){
    const box = document.getElementById("msg");
    if(box){
        box.innerText = msg;
    }
}
