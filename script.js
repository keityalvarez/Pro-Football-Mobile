// Inicializar el canvas y el contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

// Variables globales
let playerPos = { x: canvas.width / 2, y: canvas.height / 2 };
let ballPos = { x: canvas.width / 2, y: canvas.height / 2, dx: 0, dy: 0 };
let isMoving = false;
let keys = {};

// Jugadores
let playerSpeed = 5;
let aiSpeed = 3;
let playerDirection = { x: 0, y: 0 };

// IA: Definir al equipo rival
let enemyPlayers = [];
for (let i = 0; i < 10; i++) {
    enemyPlayers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: Math.random() * aiSpeed,
        dy: Math.random() * aiSpeed,
        team: 'enemy'
    });
}

// Configuración del control táctil
let joystick = { x: 100, y: canvas.height - 100, radius: 50 };
let controls = {
    pass: { x: canvas.width - 150, y: canvas.height - 200, size: 50 },
    shoot: { x: canvas.width - 100, y: canvas.height - 200, size: 50 },
    sprint: { x: canvas.width - 150, y: canvas.height - 150, size: 50 },
    slide: { x: canvas.width - 100, y: canvas.height - 150, size: 50 }
};

// Función para dibujar al jugador
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(playerPos.x, playerPos.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Función para dibujar el balón
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPos.x, ballPos.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Función para mover el balón
function moveBall() {
    ballPos.x += ballPos.dx;
    ballPos.y += ballPos.dy;
    if (ballPos.x < 0 || ballPos.x > canvas.width) ballPos.dx = -ballPos.dx;
    if (ballPos.y < 0 || ballPos.y > canvas.height) ballPos.dy = -ballPos.dy;
}

// Función para mover los jugadores rivales (IA)
function moveAI() {
    enemyPlayers.forEach(player => {
        // Movimiento aleatorio hacia el balón
        player.x += player.dx;
        player.y += player.dy;

        if (player.x < 0 || player.x > canvas.width) player.dx = -player.dx;
        if (player.y < 0 || player.y > canvas.height) player.dy = -player.dy;
    });
}

// Función para dibujar los controles táctiles
function drawControls() {
    // Dibujar joystick
    ctx.beginPath();
    ctx.arc(joystick.x, joystick.y, joystick.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();

    // Dibujar botones de control
    ctx.beginPath();
    ctx.arc(controls.pass.x, controls.pass.y, controls.pass.size, 0, Math.PI * 2);
    ctx.fillStyle = '#008CBA';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(controls.shoot.x, controls.shoot.y, controls.shoot.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FF5733';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(controls.sprint.x, controls.sprint.y, controls.sprint.size, 0, Math.PI * 2);
    ctx.fillStyle = '#28A745';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(controls.slide.x, controls.slide.y, controls.slide.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FFC107';
    ctx.fill();
    ctx.closePath();
}

// Función para dibujar el equipo enemigo
function drawEnemy() {
    enemyPlayers.forEach(player => {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    });
}

// Función principal de actualización del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar movimientos y colisiones
    moveBall();
    moveAI();

    // Dibujar elementos
    drawBall();
    drawPlayer();
    drawControls();
    drawEnemy();

    // Solicitar la siguiente animación
    requestAnimationFrame(gameLoop);
}

// Configuración inicial
gameLoop();