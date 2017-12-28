class CanvasHandler {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.gc = this.canvas.getContext("2d");

    this.appleImage = document.getElementById("js-asset-apple");
    this.appleAnimationScale = 0;
    this.appleAnimationDirection = 1;

    this.setCanvasSize();
    window.addEventListener("resize", (event) => this.setCanvasSize());
  }

  setCanvasSize() {
    this.canvas.width = Math.floor(this.canvas.clientWidth / GameConfig.X_TILES) * GameConfig.X_TILES * 2;
    this.canvas.height = Math.floor(this.canvas.clientHeight / GameConfig.Y_TILES) * GameConfig.Y_TILES * 2;

    this.tileWidth = Math.floor(this.canvas.width / GameConfig.X_TILES);
    this.tileHeight = Math.floor(this.canvas.height / GameConfig.Y_TILES);
  }

  draw(game) {
    this.drawBackground();

    if (game.apple != null) this.drawApple(game.apple, game.active);
    if (game.snake != null) this.drawSnake(game.snake);
  }

  drawBackground() {
    for (let i = 0; i < GameConfig.X_TILES; i++) {
      for (let j = 0; j < GameConfig.Y_TILES; j++) {
        let tile = new Tile(i, j);
        let color;

        if ((i + j) % 2 == 0) color = GameConfig.BACKGROUND_COLOR_1;
        else color = GameConfig.BACKGROUND_COLOR_2;

        this.gc.fillStyle = color;
        this.drawTile(tile);
      }
    }
  }

  drawSnake(snake) {
    this.gc.fillStyle = GameConfig.SNAKE_COLOR;

    for (let i = 0; i < snake.snake.length; i++) {
      this.drawTile(snake.snake[i]);
    }
  }

  drawApple(apple, active) {
    if (active) this.animateApple(apple);
    else this.drawImageOnTile(this.appleImage, apple);
  }

  animateApple(apple) {
    if (this.appleAnimationDirection == 1) {
      if (this.appleAnimationScale < GameConfig.REFRESH_FPS) this.appleAnimationScale += 3;
      else this.appleAnimationDirection = -1;
    } else {
      if (this.appleAnimationScale > -GameConfig.REFRESH_FPS) this.appleAnimationScale -= 3;
      else this.appleAnimationDirection = 1;
    }

    this.drawImageOnTileWithScaleFactor(this.appleImage, apple, 1 - (0.25 * this.appleAnimationScale / GameConfig.REFRESH_FPS));
  }

  drawImageOnTile(image, tile) {
    this.drawImageOnTileWithScaleFactor(image, tile, 1);
  }

  drawImageOnTileWithScaleFactor(image, tile, scaleFactor) {
    let tileX = tile.x * this.tileWidth;
    let tileY = tile.y * this.tileHeight;

    let imageWidth = this.tileWidth * scaleFactor;
    let imageHeight = this.tileHeight * scaleFactor;
    let imageX = tileX - (imageWidth - this.tileWidth)/2;
    let imageY = tileY - (imageHeight - this.tileHeight)/2;

    this.gc.drawImage(image, imageX, imageY, imageWidth, imageHeight);
  }

  drawTile(tile) {
    let tileX = tile.x * this.tileWidth;
    let tileY = tile.y * this.tileHeight;

    this.gc.fillRect(tileX, tileY, this.tileWidth, this.tileHeight);
  }
}
