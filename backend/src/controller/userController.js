const connection = require('../config/db');

async function storeUser(request, response) {
    const params = [
        request.body.nome,
        request.body.email,
        request.body.senha 
    ];

    const query = "INSERT INTO usuario(nome,email,senha) VALUES(?,?,?);";

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Sem Sucesso",
                data: results
            });
        }
    });
}

async function loginUser(request, response) {
    const { email, senha } = request.body;

    const query = "SELECT * FROM usuario WHERE email = ?";

    connection.query(query, [email], (err, results) => {
        if (err) {
            response.status(500).json({
                success: false,
                message: "Erro no servidor",
                error: err
            });
        } else if (results.length > 0) {
            const user = results[0];

            if (senha === user.senha) {
                response.status(200).json({
                    success: true,
                    message: "Login bem-sucedido",
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email
                    }
                });
            } else {
                response.status(401).json({
                    success: false,
                    message: "Senha incorreta"
                });
            }
        } else {
            response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

async function saveHighScore(request, response) {
    let id_usuario = localStorage.getItem('id');  // Assume user ID is stored in localStorage
    let id_jogo = 1;  // Set the game ID for Space Invaders, for example

    if (!id_usuario) {
        alert("User not logged in. Cannot save score.");
        return;
    }

    let highScoreData = {
        id_usuario: id_usuario,
        id_jogo: id_jogo,
        pontuacao: score  // Send the final score
    };

    fetch("http://localhost:3006/api/save-highscore", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(highScoreData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("High score saved successfully!");
        } else {
            alert("Failed to save high score: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error saving high score:", error);
    });
}



// async function userData(request, response) {
//     const
// }

module.exports = {
    storeUser,
    loginUser,
    saveHighScore
}
