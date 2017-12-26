'use strict';

let game = new Game();
game.newGame();

let canvasHandler = new CanvasHandler("snake-canvas");
canvasHandler.draw(game);

let keyboardHandler = new KeyboardHandler(game);

window.setInterval(function () {
  canvasHandler.draw(game);
}, 1000 / GameConfig.REFRESH_FPS);
