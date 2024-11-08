let loginButton = document.getElementById("login");

loginButton.onclick = async function () {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let dados = { email, senha };
    console.log(dados);

    const response = await fetch("mysql://ueuhvy1q22pnq6nb:hluATN3GfuUD3sADXQnE@bipyvggoxvlqujm8awc6-mysql.services.clever-cloud.com:3306/bipyvggoxvlqujm8awc6/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dados)
    });

    const results = await response.json();
    console.log(results);

    if (results.success) {
        alert("Login bem-sucedido");
        console.log('Storing id:', results.user.id);  // Debugging
        // Redirecionar ou fazer algo após o login
        localStorage.setItem('id', results.user.id);  // Store user ID
        localStorage.setItem('name', results.user.nome);
        window.location.href = "home.html";
        
    } else {
        alert("Falha no login: " + results.message);
    }
}


