// Replacing getElementById with querySelector to increase performance 
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const clickUp = document.querySelector("#up");
const clickDown = document.querySelector("#down");
const clickLeft = document.querySelector("#left");
const clickRight = document.querySelector("#right");
const reload = document.querySelector("#reset");

//increase snake size
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let tileCount = 20;
let tileSize = 400 / tileCount - 2;
let headX = 10;
let headY = 10;

// array for snake parts
const snakeParts = [];
let tailLength = 0;

//initialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;

//draw apple
let appleX = 5;
let appleY = 5;

//scores
let score = 0;

// create game loop - to continuously update screen
function drawGame() {
  changeSnakePosition();
  
  // game over logic
  let result = isGameOver();
  if (result) {
    return;
  }
  
  clearScreen();
  drawSnake();
  drawApple();
  checkCollision();
  drawScore();
  
  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
}

// Game over function
function isGameOver() {
  let gameOver = false;
  //check whether game has started
  if (yvelocity === 0 && xvelocity === 0) {
    return false;
  } else if (
    headX < 0 || //if snake hits left wall
    headX === tileCount || //if snake hits right wall
    headY < 0 || //if snake hits wall at the top
    headY === tileCount //if snake hits wall at the bottom
  ) {
      gameOver = true;
  }
  
  //stop game when snake crush to its own body
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      //check whether any part of snake is occupying the same space
      gameOver = true;
      break;
    }
  }
  //display text Game Over
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "60px Georgia, serif";
    ctx.fillText(
      "Se fodeu!",
      canvas.width / 6.5,
      canvas.height / 2
    ); //position our text in center
  }
  return gameOver; // this will stop execution of drawgame method
}

//score function
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "15px Verdana, sans-serif";
  ctx.fillText("Score: " + score, canvas.width - 70, 15); // position our score at right hand corner
}

//clear our screen
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  //add parts to snake through push
  snakeParts.push(new snakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size
  }
  ctx.fillStyle = "green";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xvelocity;
  headY = headY + yvelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

//check for collision and change apple position
function checkCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++; //increase size of snake
    score++; //increase score value
  }
}

//add event listener to our body
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
  if (event.key === "r") {
    location.reload();
  }
}

clickUp.addEventListener("click", () => {
  if (yvelocity === 1) {
    return; //prevent snake from moving in opposite direction
  }
  xvelocity = 0;
  yvelocity = -1;
});

clickDown.addEventListener("click", () => {
  if (yvelocity === -1) {
    return;
  }
  xvelocity = 0;
  yvelocity = 1;
});

clickLeft.addEventListener("click", () => {
  if (xvelocity === 1) {
    return;
  }
  xvelocity = -1;
  yvelocity = 0;
});

clickRight.addEventListener("click", () => {
  if (xvelocity === -1) {
    return;
  }
  xvelocity = 1;
  yvelocity = 0;
});

reset.addEventListener("click", () => {
  location.reload();
});

drawGame();