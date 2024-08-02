let button = document.getElementById("submit")

button.onclick = async function () {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let dados = { nome, email, senha }

    const response = await fetch("http://localhost:3006/api/register", {
        method: "POST",
        headers: {"Content-type":"application/json,charset=UTF-8"},
        body: JSON.stringify(dados)

    })

    if(content.sucess){
        alert("Sucesso")
    }else{
        alert("Não foi sucesso")
        console.log(content.sql);
    }

}