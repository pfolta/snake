import config from './core/config';
import Tile from './model/tile';

export default class CanvasHandler {
  constructor(canvasId, game) {
    this.canvas = document.getElementById(canvasId);
    this.gc = this.canvas.getContext('2d');

    this.game = game;

    this.uiControls = document.getElementById('js-ui-controls');

    this.appleImage = document.getElementById('js-asset-apple');
    this.appleAnimationScale = 100;
    this.appleAnimationDirection = 1;

    this.recomputeCanvas();
    window.addEventListener('resize', () => this.recomputeCanvas());
    window.addEventListener('orientationchange', () => this.recomputeCanvas());

    window.requestAnimationFrame(() => this.draw());
  }

  recomputeCanvas() {
    this.resizeCanvas();

    this.canvas.width = Math.floor(this.canvas.clientWidth / config.X_TILES) * config.X_TILES * 2;
    this.canvas.height = Math.floor(this.canvas.clientHeight / config.Y_TILES) * config.Y_TILES * 2;

    this.tileWidth = Math.floor(this.canvas.width / config.X_TILES);
    this.tileHeight = Math.floor(this.canvas.height / config.Y_TILES);
  }

  resizeCanvas() {
    let availableWidth = document.documentElement.clientWidth;
    let availableHeight = document.documentElement.clientHeight - this.uiControls.clientHeight;
    let canvasSize;

    if (availableWidth < availableHeight) canvasSize = availableWidth;
    else canvasSize = availableHeight;

    canvasSize += 'px';

    this.canvas.style.width = canvasSize;
    this.canvas.style.height = canvasSize;
  }

  draw() {
    this.drawBackground();

    if (this.game.apple != null) this.drawApple(this.game.apple, this.game.paused);
    if (this.game.snake != null) this.drawSnake(this.game.snake);

    window.setTimeout(() => window.requestAnimationFrame(() => this.draw()), 1000 / config.REFRESH_FPS);
  }

  drawBackground() {
    for (let i = 0; i < config.X_TILES; i++) {
      for (let j = 0; j < config.Y_TILES; j++) {
        let tile = new Tile(i, j);
        let color;

        if ((i + j) % 2 == 0) color = config.BACKGROUND_COLOR_1;
        else color = config.BACKGROUND_COLOR_2;

        this.gc.fillStyle = color;
        this.drawTile(tile);
      }
    }
  }

  drawSnake(snake) {
    this.gc.fillStyle = config.SNAKE_COLOR;

    for (let i = 0; i < snake.snake.length; i++) {
      this.drawTile(snake.snake[i]);
    }
  }

  drawApple(apple, paused) {
    if (paused) this.drawImageOnTile(this.appleImage, apple);
    else this.animateApple(apple);
  }

  animateApple(apple) {
    if (this.appleAnimationDirection == 1) {
      if (this.appleAnimationScale < 120) this.appleAnimationScale += 1;
      else this.appleAnimationDirection = -1;
    } else {
      if (this.appleAnimationScale > 80) this.appleAnimationScale -= 1;
      else this.appleAnimationDirection = 1;
    }

    this.drawImageOnTileWithScaleFactor(this.appleImage, apple, 0.01 * this.appleAnimationScale);
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
