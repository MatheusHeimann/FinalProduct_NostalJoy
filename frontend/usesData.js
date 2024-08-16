// Get stored user information
let id_usuario = localStorage.getItem('id_usuario');

if (!id_usuario) {
    alert("User not logged in. Redirecting to login page.");
    window.location.href = "login.html"; // Redirect to login if not logged in
} else {
    console.log("User ID:", id_usuario);
}
