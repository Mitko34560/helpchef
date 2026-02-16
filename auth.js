// ===== Helper =====
function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users){
    localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser(){
    const username = localStorage.getItem("loggedUser");
    if(!username) return null;

    const users = getUsers();
    return users.find(u => u.username === username);
}

// ===== Register =====
function register(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = getUsers();

    if(users.find(u => u.username === username)){
        showMessage("Потребителят вече съществува.");
        return;
    }

    const newUser = {
        username,
        password,
        role: username === "admin" ? "admin" : "user",
        blocked: false
    };

    users.push(newUser);
    saveUsers(users);

    localStorage.setItem("loggedUser", username);
    window.location.href = "profile.html";
}

// ===== Login =====
function login(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if(!user){
        showMessage("Грешни данни.");
        return;
    }

    if(user.blocked){
        showMessage("Този акаунт е блокиран от администратор.");
        return;
    }

    localStorage.setItem("loggedUser", username);
    window.location.href = "profile.html";
}

// ===== Logout =====
function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href="index.html";
}

// ===== UI message =====
function showMessage(msg){
    const box = document.getElementById("msg");
    if(box){
        box.innerText = msg;
        box.style.opacity = "1";
    }
}

// ===== Navbar Update =====
document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();

    if(user){
        const authGroup = document.querySelector(".auth-group");
        if(authGroup){
            authGroup.innerHTML = `
                <a href="profile.html">👤 ${user.username}</a>
                <button onclick="logout()" class="btn-cta">Logout</button>
            `;
        }
    }
});
