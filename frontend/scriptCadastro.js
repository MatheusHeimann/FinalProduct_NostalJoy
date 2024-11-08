// getUsers();

let button = document.getElementById("submit");

button.onclick = async function () {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let dados = { nome, email, senha }
    console.log(dados);
    const response = await fetch("mysql://ueuhvy1q22pnq6nb:hluATN3GfuUD3sADXQnE@bipyvggoxvlqujm8awc6-mysql.services.clever-cloud.com:3306/bipyvggoxvlqujm8awc6/api/register", {
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