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

// Função para salvar o score do usuário
async function saveHighScore(request, response) {
    const { id_jogo, id_usuario, pontuacao } = request.body;
    console.log(request.body)
    // Valida se todos os parâmetros necessários foram enviados
    if (!id_jogo || !id_usuario || pontuacao === undefined) {
        return response.status(400).json({
            success: false,
            message: "Parâmetros faltando (id_jogo, id_usuario, pontuacao)"
        });
    }

    // Query para inserir o histórico de pontuação
    const query = "INSERT INTO historico(id_jogo, id_usuario, pontuacao) VALUES(?, ?, ?);";

    // Executa a query com os parâmetros fornecidos
    connection.query(query, [id_jogo, id_usuario, pontuacao], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao salvar o score no banco de dados",
                error: err
            });
        }

        // Resposta de sucesso
        response.status(200).json({
            success: true,
            message: "Score salvo com sucesso",
            data: results
        });
    });
}


async function scoreUser(request, response) {
    const { id_usuario } = request.body;
    console.log(id_usuario);

    const query = `
    SELECT id_jogo, 
           jogos.nome_jogo AS nome_jogo, 
           MAX(historico.pontuacao) AS maior_pontuacao
    FROM historico
    INNER JOIN jogos ON historico.id_jogo = jogos.id
    WHERE historico.id_usuario = ?
    GROUP BY historico.id_jogo, jogos.nome_jogo;`;

    connection.query(query, [id_usuario], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro no servidor",
                error: err
            });
        }

        if (results.length > 0) {
            // Inicia a construção da string HTML
            let html = '<ul class = "list_score">';
            results.forEach(row => {
                // variavel que recebe o return da função
                // Substitua 'nome_do_jogo' pela lógica correta para obter o nome do jogo a partir do id_jogo
                const nome_do_jogo = row.nome_jogo; // Ajuste isso para pegar o nome real do jogo
                html += `<li class = "list_item">${nome_do_jogo} - Pontuação: ${row.maior_pontuacao}</li>`;
            });
            html += '</ul>';

            return response.send(html);
        } else {
            return response.status(404).json({
                success: false,
                message: "Request não encontrado"
            });
        }
    });
}


// fazer uma função que faça um select pegando o nome do jogo a partir do id_jogo
// fazer um return para a variavel 

module.exports = {
    storeUser,
    loginUser,
    saveHighScore,
    scoreUser
    
}
