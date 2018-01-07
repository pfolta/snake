class Game {
  constructor(storageHandler) {
    this.HIGHSCORE_STORAGE_KEY = "highscore";

    this.storageHandler = storageHandler;
    this.readStorageContents();
  }

  registerUiHandler(uiHandler) {
    this.uiHandler = uiHandler;
  }

  readStorageContents() {
    this.highscore = storageHandler.get(this.HIGHSCORE_STORAGE_KEY, 0);
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
    if (this.snake.head().dx != 1) {
      this.dx = -1;
      this.dy = 0;
    }
  }

  up() {
    if (this.snake.head().dy != 1) {
      this.startGame();
      this.dx = 0;
      this.dy = -1;
    }
  }

  right() {
    if (this.snake.head().dx != -1) {
      this.startGame();
      this.dx = 1;
      this.dy = 0;
    }
  }

  down() {
    if (this.snake.head().dy != -1) {
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
      this.increaseScore(1);
    }

    // Move snake
    this.snake.move(this.dx, this.dy);
    this.snake.loopThroughWalls();

    // Snake collides with itself
    if (this.snake.collidesWithItself()) return this.endGame();
  }

  increaseScore(increment) {
    this.score += increment;
    if (this.score > this.highscore) this.setHighscore(this.score);

    this.uiHandler.updateUiControls();
  }

  setHighscore(highscore) {
    this.highscore = highscore;

    this.storageHandler.set(this.HIGHSCORE_STORAGE_KEY, this.highscore);
    this.uiHandler.updateUiControls();
  }

  resetHighscore() {
    this.setHighscore(0);
  }
}
