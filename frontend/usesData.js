// Get stored user information
let id = localStorage.getItem('id');

if (!id) {
    alert("User not logged in. Redirecting to login page.");
    window.location.href = "login.html"; // Redirect to login if not logged in
} else {
    console.log("User ID:", id);
}
