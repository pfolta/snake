class CanvasHandler {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.gc = this.canvas.getContext("2d");

    this.setCanvasSize();

    window.addEventListener("resize", (event) => {
      this.setCanvasSize();
    });
  }

  setCanvasSize() {
    this.canvas.width = Math.floor(this.canvas.clientWidth / GameConfig.X_TILES) * GameConfig.X_TILES * 2;
    this.canvas.height = Math.floor(this.canvas.clientHeight / GameConfig.Y_TILES) * GameConfig.Y_TILES * 2;
  }

  draw(game) {
    this.clearCanvas();

    if (game.apple != null) this.drawApple(game.apple);
    if (game.score != null) this.drawScore(game.score, game.highscore);
    if (game.snake != null) this.drawSnake(game.snake);
  }

  clearCanvas() {
    this.gc.fillStyle = GameConfig.BACKGROUND_COLOR;
    this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawScore(score, highscore) {
    this.gc.fillStyle = GameConfig.SNAKE_COLOR;
    this.gc.fillText(score + " (" + highscore + ")", 10, 10);
  }

  drawSnake(snake) {
    this.gc.fillStyle = GameConfig.SNAKE_COLOR;

    for (let i = 0; i < snake.snake.length; i++) {
      this.drawTile(snake.snake[i]);
    }
  }

  drawApple(apple) {
    this.gc.fillStyle = GameConfig.APPLE_COLOR;
    this.drawTile(apple);
  }

  drawTile(tile) {
    let tileWidth = Math.floor(this.canvas.width / GameConfig.X_TILES);
    let tileHeight = Math.floor(this.canvas.height / GameConfig.Y_TILES);
    let tileX = tile.x * tileWidth;
    let tileY = tile.y * tileHeight;

    this.gc.fillRect(tileX + 1, tileY + 1, tileWidth - 2, tileHeight - 2);
  }
}
