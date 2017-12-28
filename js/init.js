'use strict';

let game = new Game();
game.newGame();

let canvasHandler = new CanvasHandler("js-snake-canvas", game);
let keyboardHandler = new KeyboardHandler(game);
let touchHandler = new TouchHandler(game);
