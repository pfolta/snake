'use strict';

let game = new Game();

let canvasHandler = new CanvasHandler("js-snake-canvas", game);
let keyboardHandler = new KeyboardHandler(game);
let touchHandler = new TouchHandler(game);
let uiHandler = new UiHandler(game);

game.registerUiHandler(uiHandler);
game.newGame();
