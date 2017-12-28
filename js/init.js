'use strict';

let game = new Game();
game.newGame();

let canvasHandler = new CanvasHandler("js-snake-canvas");
canvasHandler.draw(game);

let keyboardHandler = new KeyboardHandler(game);
let touchHandler = new TouchHandler(game);

window.setInterval(() => canvasHandler.draw(game), 1000 / GameConfig.REFRESH_FPS);
