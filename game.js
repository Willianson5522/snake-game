const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let tileCount = 20; //define screen size in pixels
let tileSize = 18; //define snake initial size
let headX = 10;
let headY = 10;

//inicialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  if (event.key === "ArrowUp" || event.key === "w") {
    if (yvelocity === 1) {
      return; //prevent snake from moving in opposite direction
    }
    xvelocity = 0;
    yvelocity = -1;
  }

  if (event.key === "ArrowDown" || event.key === "s") {
    if (yvelocity === -1) {
      return;
    }
    xvelocity = 0;
    yvelocity = 1;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    if (xvelocity === 1) {
      return;
    }
    xvelocity = -1;
    yvelocity = 0;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    if (xvelocity === -1) {
      return;
    }
    xvelocity = 1;
    yvelocity = 0;
  }
}

function changeSnakePosition() {
  headX = headX + xvelocity;
  headY = headY + yvelocity;
}

function drawGame() {
  clearScreen();
  drawSnake();
  changeSnakePosition();

  let speed = 7; //The interval will be seven times a second
  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); //color start from 0px left, right to canvas width and canvas height
}

function drawSnake() {
  ctx.fillStyle = "green";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

drawGame();
