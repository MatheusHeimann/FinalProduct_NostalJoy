const road = document.querySelector('.road');
const playerCar = document.querySelector('.player-car');
const obstacleCar = document.querySelector('.obstacle-car');
const scoreDisplay = document.querySelector('.score');

let playerPosition = 175;
let obstaclePosition = -100;
let gameInterval;
let pontuacao = 0;
let gameOver = false;

document.addEventListener('keydown', moveCar);

function moveCar(event) {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 25;
    } else if (event.key === 'ArrowRight' && playerPosition < 350) {
        playerPosition += 25;
    }
    playerCar.style.left = playerPosition + 'px';
}

function moveObstacle() {
    if (gameOver) return; // Para o movimento se o jogo acabou

    obstaclePosition += 5;
    if (obstaclePosition > 600) {
        obstaclePosition = -100;
        obstacleCar.style.left = Math.random() * 350 + 'px';
        atualizarPontuacao(); // Atualiza a pontuação ao ultrapassar
        aumentarVelocidade(); // Aumenta a velocidade após ultrapassar
    }
    obstacleCar.style.top = obstaclePosition + 'px';

    checkCollision();
}

function atualizarPontuacao() {
    pontuacao += 100;
    scoreDisplay.textContent = `Pontuação: ${pontuacao}`;
}

function aumentarVelocidade() {
    speed += speedIncrement; // Incrementa a velocidade
    console.log(`Velocidade atual: ${speed}`);
}

async function salvarPontuacao() {
    let id_usuario = localStorage.getItem('id');
    let id_jogo = 3; // Substitua pelo ID do jogo correspondente
    let data = { id_jogo, id_usuario, pontuacao };

    try {
        const response = await fetch('http://localhost:3006/api/save_highscore', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const results = await response.json();
        console.log(results);
    } catch (error) {
        console.error("Erro ao salvar a pontuação:", error);
    }
}

function checkCollision() {
    const playerRect = playerCar.getBoundingClientRect();
    const obstacleRect = obstacleCar.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
    ) {
        gameOver = true; // Marca que o jogo acabou
        clearInterval(gameInterval); // Para o movimento do obstáculo

        salvarPontuacao(); // Salva a pontuação no banco de dados

        mostrarPopup(); // Exibe o popup
    }
}

function mostrarPopup() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <h2>Game Over!</h2>
        <p>Sua pontuação: ${pontuacao}</p>
        <button class="play-again">Jogar novamente</button>
        <button class="back-to-menu">Voltar para a seleção de jogos</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    overlay.style.display = 'block';
    popup.style.display = 'block';

    // Event Listeners para os botões
    popup.querySelector('.play-again').addEventListener('click', () => {
        overlay.remove();
        popup.remove();
        reiniciarJogo();
    });

    popup.querySelector('.back-to-menu').addEventListener('click', () => {
        overlay.remove();
        popup.remove();
        // Redirecione para a seleção de jogos
        window.location.href = '../select.html'; // Ajuste para a URL do seu menu
    });
}

function reiniciarJogo() {
    gameOver = false; // Reinicia o estado do jogo
    pontuacao = 0;
    speed = 5;
    scoreDisplay.textContent = `Pontuação: ${pontuacao}`;
    obstaclePosition = -100;
    startGame();
}

function startGame() {
    gameInterval = setInterval(moveObstacle, 20);
}

startGame();
