class Game {
  constructor(canvasHandler) {
    this.canvasHandler = canvasHandler;
    this.highscore = 0;
  }

  newGame() {
    this.score = 0;

    this.active = false;
    this.ready = true;

    this.snake = new Snake();
    this.apple = new Apple(this.snake);

    this.dx = 1;
    this.dy = 0;
  }

  startStopGame() {
    if (this.active) this.stopGame();
    else this.startGame();
  }

  startGame() {
    if (!this.ready) this.newGame();

    this.active = true;
    this.gameInterval = window.setInterval(() => {
      this.game();
    }, 1000/10);
  }

  stopGame() {
    this.active = false;
    window.clearInterval(this.gameInterval);
  }

  endGame() {
    this.stopGame();
    this.ready = false;
    this.highscore = Math.max(this.highscore, this.score);

    console.log("Game over!");
    console.log("Your score is " + this.score);
    console.log("Your high score is " + this.highscore);
  }

  left() {
    if (this.active && this.dx != 1) {
      this.dx = -1;
      this.dy = 0;
    }
  }

  up() {
    if (this.active && this.dy != 1) {
      this.dx = 0;
      this.dy = -1;
    }
  }

  right() {
    if (this.active && this.dx != -1) {
      this.dx = 1;
      this.dy = 0;
    }
  }

  down() {
    if (this.active && this.dy != -1) {
      this.dx = 0;
      this.dy = 1;
    }
  }

  game() {
    if (GameConfig.ENABLE_WALLS && this.snake.aboutToCollideWithWalls(this.dx, this.dy)) return this.endGame();

    this.snake.move(this.dx, this.dy);
    this.snake.loopThroughWalls();

    // Snake eats an apple
    if (Tile.collides(this.snake.head(), this.apple)) {
      this.snake.eatApple(this.dx, this.dy);
      this.apple = new Apple(this.snake);
      this.score++;
    }

    // Snake collides with itself
    if (this.snake.collidesWithItself()) return this.endGame();
  }
}
