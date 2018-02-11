import CanvasHandler from './canvas_handler';
import Game from './game';
import KeyboardHandler from './keyboard_handler';
import StorageHandler from './storage_handler';
import TouchHandler from './touch_handler';
import UiHandler from './ui_handler';

let storageHandler = new StorageHandler();
let game = new Game(storageHandler);

new CanvasHandler('js-snake-canvas', game);
new KeyboardHandler(game);
new TouchHandler('js-snake-canvas', game);
let uiHandler = new UiHandler(game);

game.registerUiHandler(uiHandler);
game.newGame();
