document.getElementById("show-login").addEventListener("click", function(event) {
    event.preventDefault(); 
    document.getElementById("register-form-container").style.display = "none";
    document.getElementById("login-form-container").style.display = "flex";
});

document.getElementById("show-register").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("login-form-container").style.display = "none";
    document.getElementById("register-form-container").style.display = "flex";
});
