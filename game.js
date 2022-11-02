const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let tileCount = 20; //define screen size in pixels
let tileSize = 18; //define snake initial size
let headX = 10;
let headY = 10;

function drawGame() {
  clearScreen();
  drawSnake();

  let speed = 7; //The interval will be seven times a second
  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); //color start from 0px left, right to canvas width and canvas height
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

drawGame();
