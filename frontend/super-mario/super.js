const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let id_jogo = 2;

const gravity = 0.5;


let isJumping = false;
let pontuacao = 0;
let gameOver = false;


// Player Object
const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpHeight: -10,
    color: 'red'
};

// Moedas
const coins = [
    { x: 250, y: 320, width: 20, height: 20, collected: false, originalPosition: { x: 250, y: 320 } },
    { x: 450, y: 240, width: 20, height: 20, collected: false, originalPosition: { x: 450, y: 240 } },
    // ... adicione mais moedas aqui
];

// Platform Object
const platforms = [
    { x: 140, y: 350, width: 190, height: 20 },
    { x: 350, y: 270, width: 190, height: 20 },
    { x: 560, y: 190, width: 190, height: 20 }
];

// Enemy Object
const enemies = [
    { x: 600, y: 305, width: 40, height: 40, velocityX: 2, color: 'green' }
];

function drawCoins() {
    ctx.fillStyle = 'yellow';
    coins.forEach(coin => {
        if (!coin.collected) {
            ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
        }
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'brown';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function handleCoinCollision() {
    coins.forEach(coin => {
        if (checkCollision(player, coin) && !coin.collected) {
            coin.collected = true;
            pontuacao += 100;
        }
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.velocityX;
        // Reverse direction when reaching canvas edges
        if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
            enemy.velocityX *= -1;
        }
    });
}

function checkCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function handlePlatformCollision() {
    platforms.forEach(platform => {

        const tolerance = 5;

        // Colisão por baixo (código corrigido)
        if (player.y + player.height <= platform.y + tolerance &&
            player.y + player.height + player.velocityY >= platform.y &&
            (player.x + player.width >= platform.x && player.x <= platform.x + platform.width ||
                player.x + player.width >= platform.x && player.x <= platform.x + platform.width)) {
            player.velocityY = 0;
            player.y = platform.y - player.height;
            isJumping = false;
        }

        // Colisão por cima (código corrigido)
        if (player.y >= platform.y + platform.height &&
            player.y + player.velocityY <= platform.y + platform.height &&
            (player.x + player.width > platform.x && player.x <= platform.x + platform.width ||
                player.x + player.width >= platform.x && player.x <= platform.x + platform.width)) {
            player.velocityY = 0;
            player.y = platform.y + platform.height;
        }

        // Colisão pela esquerda
        if (player.x + player.width <= platform.x &&
            player.x + player.width + player.velocityX >= platform.x &&
            player.y + player.height >= platform.y &&
            player.y <= platform.y + platform.height) {
            player.velocityX = 0;
            player.x = platform.x - player.width; // Ajusta a posição para a esquerda da plataforma
        }

        // Colisão pela direita
        if (player.x >= platform.x + platform.width &&
            player.x + player.velocityX <= platform.x + platform.width &&
            player.y + player.height >= platform.y &&
            player.y <= platform.y + platform.height) {
            player.velocityX = 0;
            player.x = platform.x + platform.width; // Ajusta a posição para a direita da plataforma
        }
    });
}


function handleCollisions() {
    handlePlatformCollision();
    handleCoinCollision();

    enemies.forEach((enemy) => {
        if (checkCollision(player, enemy)) {
            if (!gameOver) {
                gameOver = true;
                setTimeout(() => {
                    const popup = document.createElement('div');
                    popup.classList.add('popup');
                    popup.innerHTML = `
            <h2>Game Over!</h2>
            <p>Sua pontuação: ${pontuacao}</p>
            <button class="play-again">Jogar novamente</button>
            <button class="back-to-menu">Voltar para a seleção de jogos</button>
        `;

                    document.body.appendChild(popup);

                    // Add an event listener to the play again button
                    const playAgainButton = popup.querySelector('.play-again');
                    playAgainButton.addEventListener('click', () => {
                        popup.remove(); 
                        resetGame();
                    });
                    const backToMenuButton = popup.querySelector('.back-to-menu');
                    backToMenuButton.addEventListener('click', () => {
                        popup.remove();
                        window.location.href = "../select.html";
                    });
                    
                }, 100);
            }
        }
    });
}

function resetGame() {
    // Reset player position and score
    player.x = 50;
    player.y = 300;
    player.velocityX = 0;
    player.velocityY = 0;
    pontuacao = 0;
    coins.forEach(coin => {
        coin.x = coin.originalPosition.x;
        coin.y = coin.originalPosition.y;
        coin.collected = false;
    });
    gameOver = false;
    update();  // Restart the game loop
}

function updateScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${pontuacao}`, 10, 20);
}

async function update() {
    if (gameOver == true) {

        // Chamar a rota para enviar o score ao backend
        let id_usuario = localStorage.getItem('id');
        let data = { id_jogo, id_usuario, pontuacao }

        console.log(data)

        const response = await fetch('http://localhost:3006/api/save_highscore', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const results = await response.json();

        console.log(results)

        return;

    }

    // Prevent update loop during Game Over

    ctx.clearRect(0, 0, canvas.width, canvas.height);



    // Apply gravity
    player.velocityY += gravity;
    player.y += player.velocityY;
    player.x += player.velocityX;

    // Prevent player from falling off the canvas
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        isJumping = false;
    }

    // Prevent player from going out of bounds horizontally
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    drawPlayer();
    drawPlatforms();
    drawEnemies();
    drawCoins();
    handleCoinCollision();
    moveEnemies();
    handleCollisions();
    updateScore();


    requestAnimationFrame(update);
}

// Player Controls
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping && !gameOver) {
        player.velocityY = player.jumpHeight;
        isJumping = true;
    }
    if (e.code === 'ArrowRight' && !gameOver) {
        player.velocityX = player.speed;
    }
    if (e.code === 'ArrowLeft' && !gameOver) {
        player.velocityX = -player.speed;
    }
});

window.addEventListener('keyup', (e) => {
    if ((e.code === 'ArrowRight' || e.code === 'ArrowLeft') && !gameOver) {
        player.velocityX = 0;
    }
});

update();
