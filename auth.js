function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}

function getCurrentUser(){
    const username = localStorage.getItem("loggedUser");
    if(!username) return null;

    const users = getUsers();
    return users.find(u => u.username === username);
}
