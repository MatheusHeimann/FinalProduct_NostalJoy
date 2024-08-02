const connection = require('../config/db');

async function storeUser(request, response) {
    const params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha
    );

    const query = "INSERT INTO usuario(nome,email,senha) VALUES(?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: results
                })
        }
    })
}

module.exports = {
    storeUser
}