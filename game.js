const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function drawGame() {
  let speed = 7; //The interval will be seven times a second

  setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
  
  clearScreen()
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); //color start from 0px left, right to canvas width and canvas height
}

drawGame();
