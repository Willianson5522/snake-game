const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

const game = {
  snakes: {
    snake: { x: 10, y: 10 },
  },
  fruits: {
    fruit: { x: 0, y: 0 },
  },
};

let speed = 7;
let screenWidth = 20;
let screenHeight = 20;
let headX = 0;
let headY = 0;
let snakeDirectionX = game.snakes.snake.x;
let snakeDirectionY = game.snakes.snake.y;

document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
  if (event.key === "ArrowUp" || event.key === "w") {
    game.snakes.snake.y -= 1;
  }

  if (event.key === "ArrowDown" || event.key === "s") {
    game.snakes.snake.y += 1;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    game.snakes.snake.x -= 1;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    game.snakes.snake.x += 1;
  }
}

renderScreen();
function renderScreen() {
  context.fillStyle = "black";
  context.fillRect(0, 0, 20, 20);

  for (snakeId in game.snakes) {
    const snake = game.snakes[snakeId];
    context.fillStyle = "green";
    context.fillRect(snake.x, snake.y, 1, 1);
  }
  for (furits in game.fruits) {
    const fruit = game.fruits[furits];
    context.fillStyle = "red";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }
  requestAnimationFrame(renderScreen);
}
