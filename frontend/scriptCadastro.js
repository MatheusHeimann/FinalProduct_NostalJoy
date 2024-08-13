// getUsers();

let button = document.getElementById("submit");

button.onclick = async function () {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let dados = { nome, email, senha }
    console.log(dados);
    const response = await fetch("http://localhost:3006/api/register", {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(dados)
    })

    const results = await response.json();
    console.log(results);
    if(results.success){
        alert("Sucesso");
        window.location.href = "login.html";

    }else{
        alert("Não foi sucesso")
        console.log(content.sql);
    }

    
}