class CanvasHandler {
  constructor(canvasId, game) {
    this.canvas = document.getElementById(canvasId);
    this.gc = this.canvas.getContext("2d");

    this.game = game;

    this.uiControls = document.getElementById("js-ui-controls");

    this.appleImage = document.getElementById("js-asset-apple");
    this.appleAnimationScale = 0;
    this.appleAnimationDirection = 1;

    this.recomputeCanvas();
    window.addEventListener("resize", (event) => this.recomputeCanvas());

    window.setInterval(() => this.draw(), 1000 / GameConfig.REFRESH_FPS);
  }

  recomputeCanvas() {
    this.resizeCanvas();

    this.canvas.width = Math.floor(this.canvas.clientWidth / GameConfig.X_TILES) * GameConfig.X_TILES * 2;
    this.canvas.height = Math.floor(this.canvas.clientHeight / GameConfig.Y_TILES) * GameConfig.Y_TILES * 2;

    this.tileWidth = Math.floor(this.canvas.width / GameConfig.X_TILES);
    this.tileHeight = Math.floor(this.canvas.height / GameConfig.Y_TILES);
  }

  resizeCanvas() {
    let availableWidth = window.innerWidth;
    let availableHeight = window.innerHeight - this.uiControls.clientHeight;
    let canvasSize;

    if (availableWidth < availableHeight) canvasSize = availableWidth;
    else canvasSize = availableHeight;

    canvasSize += "px";

    this.canvas.style.width = canvasSize;
    this.canvas.style.height = canvasSize;
  }

  draw() {
    this.drawBackground();

    if (this.game.apple != null) this.drawApple(this.game.apple, this.game.active);
    if (this.game.snake != null) this.drawSnake(this.game.snake);
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

    this.drawImageOnTileWithScaleFactor(this.appleImage, apple, 1 - (0.2 * this.appleAnimationScale / GameConfig.REFRESH_FPS));
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
