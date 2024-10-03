const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
let score = 0;
let moveSpeed = 5; // Velocidade de movimento do jogador
let obstacleSpeed = 3; // Velocidade de queda dos obstáculos
let gameInterval;

// Cria um obstáculo
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
    gameArea.appendChild(obstacle);

    // Mover o obstáculo
    const obstacleInterval = setInterval(() => {
        obstacle.style.top = `${obstacle.offsetTop + obstacleSpeed}px`;

        // Verifica se o obstáculo saiu da tela
        if (obstacle.offsetTop > gameArea.clientHeight) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            score++;
            scoreDisplay.innerText = `Pontos: ${score}`;
        }

        // Verifica colisão com o jogador
        if (isColliding(player, obstacle)) {
            clearInterval(obstacleInterval);
            endGame();
        }
    }, 50);
}

// Verifica colisão
function isColliding(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
        playerRect.top > obstacleRect.bottom ||
        playerRect.bottom < obstacleRect.top ||
        playerRect.right < obstacleRect.left ||
        playerRect.left > obstacleRect.right
    );
}

// Movimenta o jogador
function movePlayer(direction) {
    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();

    if (direction === 'left' && playerRect.left > gameAreaRect.left) {
        player.style.left = `${playerRect.left - moveSpeed}px`;
    }
    if (direction === 'right' && playerRect.right < gameAreaRect.right) {
        player.style.left = `${playerRect.left + moveSpeed}px`;
    }
}

// Ponto de término do jogo
function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Você fez ${score} pontos.`);
    resetGame();
}

// Reinicia o jogo
function resetGame() {
    score = 0;
    scoreDisplay.innerText = `Pontos: ${score}`;
    gameArea.innerHTML = ''; // Limpa obstáculos
    player.style.left = '50%'; // Reseta a posição do jogador
    player.style.bottom = '0';
    startGame(); // Reinicia o jogo
}

// Inicia o jogo
function startGame() {
    gameInterval = setInterval(() => {
        createObstacle();
    }, 1000); // Cria um obstáculo a cada 1 segundo
}

// Controle por toque
window.addEventListener('touchstart', (event) => {
    const touchX = event.touches[0].clientX;

    if (touchX < window.innerWidth / 2) {
        movePlayer('left');
    } else {
        movePlayer('right');
    }
});

// Inicia o jogo ao carregar a página
startGame();
