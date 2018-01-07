'use strict';

let storageHandler = new StorageHandler();
let game = new Game(storageHandler);

let canvasHandler = new CanvasHandler("js-snake-canvas", game);
let keyboardHandler = new KeyboardHandler(game);
let touchHandler = new TouchHandler("js-snake-canvas", game);
let uiHandler = new UiHandler(game);

game.registerUiHandler(uiHandler);
game.newGame();
