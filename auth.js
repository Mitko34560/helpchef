// Регистрация
function register(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Попълни всичко.");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Регистрацията е успешна.");
    window.location.href = "login.html";
}

// Логин
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("Няма такъв потребител.");
        return;
    }

    if (username === storedUser.username && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Успешен вход.");
        window.location.href = "index.html";
    } else {
        alert("Грешни данни.");
    }
}

// Проверка дали е логнат
function checkAuth() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        const authGroup = document.querySelector(".auth-group");
        if (authGroup) {
            authGroup.innerHTML = `
                <span>Добре дошъл</span>
                <button onclick="logout()" class="btn-cta">Logout</button>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

document.addEventListener("DOMContentLoaded", checkAuth);
