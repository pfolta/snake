class Game {
  constructor(canvasHandler) {
    this.canvasHandler = canvasHandler;
    this.highscore = 0;
  }

  registerUiHandler(uiHandler) {
    this.uiHandler = uiHandler;
  }

  newGame() {
    this.score = 0;

    this.active = false;
    this.ready = true;

    this.snake = new Snake();
    this.apple = new Apple(this.snake);

    this.dx = 1;
    this.dy = 0;

    this.uiHandler.updateUiControls();
  }

  startStopGame() {
    if (this.active) this.stopGame();
    else this.startGame();
  }

  startGame() {
    if (!this.active) {
      if (!this.ready) this.newGame();

      this.active = true;
      this.gameInterval = window.setInterval(() => this.game(), 1000 / GameConfig.GAME_SPEED);
    }
  }

  stopGame() {
    this.active = false;
    window.clearInterval(this.gameInterval);
  }

  endGame() {
    this.stopGame();
    this.ready = false;

    console.log("Game over!");
  }

  left() {
    if (this.dx != 1) {
      this.startGame();
      this.dx = -1;
      this.dy = 0;
    }
  }

  up() {
    if (this.dy != 1) {
      this.startGame();
      this.dx = 0;
      this.dy = -1;
    }
  }

  right() {
    if (this.dx != -1) {
      this.startGame();
      this.dx = 1;
      this.dy = 0;
    }
  }

  down() {
    if (this.dy != -1) {
      this.startGame();
      this.dx = 0;
      this.dy = 1;
    }
  }

  game() {
    if (GameConfig.ENABLE_WALLS && this.snake.aboutToCollideWithWalls(this.dx, this.dy)) return this.endGame();

    // Snake eats an apple
    if (Tile.collides(this.snake.head(), this.apple)) {
      this.snake.eatApple();
      this.apple = new Apple(this.snake);

      // Update score and highscore
      this.score++;
      this.highscore = Math.max(this.highscore, this.score);
      this.uiHandler.updateUiControls();
    }

    // Move snake
    this.snake.move(this.dx, this.dy);
    this.snake.loopThroughWalls();

    // Snake collides with itself
    if (this.snake.collidesWithItself()) return this.endGame();
  }
}
