
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = 400;
const rows = canvasSize / box;
const cols = canvasSize / box;

let snake;
let food;
let score;
let direction;
let username = "";

const logoImg = new Image();
logoImg.src = "assets/logo.png";

document.addEventListener("keydown", changeDirection);

function startGame() {
  username = document.getElementById("username").value || "Player";
  document.getElementById("usernamePrompt").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("controls").style.display = "flex";

  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  score = 0;
  placeFood();
  game = setInterval(draw, 150);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
  };
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00FF00" : "#00AA00";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(logoImg, food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  const newHead = { x: headX, y: headY };

  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvasSize ||
    headY >= canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("gameOver").innerHTML =
      `<h2>Game Over, ${username}!</h2><p>Skor kamu: ${score}</p>`;
    document.getElementById("controls").style.display = "none";
    return;
  }

  snake.unshift(newHead);

  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    placeFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

// tombol hp
function setDirection(dir) {
  if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  else if (dir === "UP" && direction !== "DOWN") direction = "UP";
  else if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
  else if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}
