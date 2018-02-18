(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _canvas_handler = require('./canvas_handler');

var _canvas_handler2 = _interopRequireDefault(_canvas_handler);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _keyboard_handler = require('./keyboard_handler');

var _keyboard_handler2 = _interopRequireDefault(_keyboard_handler);

var _storage_handler = require('./storage_handler');

var _storage_handler2 = _interopRequireDefault(_storage_handler);

var _touch_handler = require('./touch_handler');

var _touch_handler2 = _interopRequireDefault(_touch_handler);

var _ui_handler = require('./ui_handler');

var _ui_handler2 = _interopRequireDefault(_ui_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storageHandler = new _storage_handler2.default();
var game = new _game2.default(storageHandler);

new _canvas_handler2.default('js-snake-canvas', game);
new _keyboard_handler2.default(game);
new _touch_handler2.default('js-snake-canvas', game);
var uiHandler = new _ui_handler2.default(game);

game.registerUiHandler(uiHandler);
game.newGame();

},{"./canvas_handler":2,"./game":4,"./keyboard_handler":5,"./storage_handler":10,"./touch_handler":11,"./ui_handler":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./core/config');

var _config2 = _interopRequireDefault(_config);

var _tile = require('./model/tile');

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasHandler = function () {
  function CanvasHandler(canvasId, game) {
    var _this = this;

    _classCallCheck(this, CanvasHandler);

    this.canvas = document.getElementById(canvasId);
    this.gc = this.canvas.getContext('2d');

    this.game = game;

    this.uiControls = document.getElementById('js-ui-controls');

    this.appleImage = document.getElementById('js-asset-apple');
    this.appleAnimationScale = 100;
    this.appleAnimationDirection = 1;

    this.recomputeCanvas();
    window.addEventListener('resize', function () {
      return _this.recomputeCanvas();
    });
    window.addEventListener('orientationchange', function () {
      return _this.recomputeCanvas();
    });

    window.requestAnimationFrame(function () {
      return _this.draw();
    });
  }

  _createClass(CanvasHandler, [{
    key: 'recomputeCanvas',
    value: function recomputeCanvas() {
      this.resizeCanvas();

      this.canvas.width = Math.floor(this.canvas.clientWidth / _config2.default.X_TILES) * _config2.default.X_TILES * 2;
      this.canvas.height = Math.floor(this.canvas.clientHeight / _config2.default.Y_TILES) * _config2.default.Y_TILES * 2;

      this.tileWidth = Math.floor(this.canvas.width / _config2.default.X_TILES);
      this.tileHeight = Math.floor(this.canvas.height / _config2.default.Y_TILES);
    }
  }, {
    key: 'resizeCanvas',
    value: function resizeCanvas() {
      var availableWidth = document.documentElement.clientWidth;
      var availableHeight = document.documentElement.clientHeight - this.uiControls.clientHeight;
      var canvasSize = void 0;

      if (availableWidth < availableHeight) canvasSize = availableWidth;else canvasSize = availableHeight;

      canvasSize += 'px';

      this.canvas.style.width = canvasSize;
      this.canvas.style.height = canvasSize;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.drawBackground();

      if (this.game.apple != null) this.drawApple(this.game.apple, this.game.paused);
      if (this.game.snake != null) this.drawSnake(this.game.snake);

      window.setTimeout(function () {
        return window.requestAnimationFrame(function () {
          return _this2.draw();
        });
      }, 1000 / _config2.default.REFRESH_FPS);
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      for (var i = 0; i < _config2.default.X_TILES; i++) {
        for (var j = 0; j < _config2.default.Y_TILES; j++) {
          var tile = new _tile2.default(i, j);
          var color = void 0;

          if ((i + j) % 2 == 0) color = _config2.default.BACKGROUND_COLOR_1;else color = _config2.default.BACKGROUND_COLOR_2;

          this.gc.fillStyle = color;
          this.drawTile(tile);
        }
      }
    }
  }, {
    key: 'drawSnake',
    value: function drawSnake(snake) {
      this.gc.fillStyle = _config2.default.SNAKE_COLOR;

      for (var i = 0; i < snake.snake.length; i++) {
        this.drawTile(snake.snake[i]);
      }
    }
  }, {
    key: 'drawApple',
    value: function drawApple(apple, paused) {
      if (paused) this.drawImageOnTile(this.appleImage, apple);else this.animateApple(apple);
    }
  }, {
    key: 'animateApple',
    value: function animateApple(apple) {
      if (this.appleAnimationDirection == 1) {
        if (this.appleAnimationScale < 120) this.appleAnimationScale += 1;else this.appleAnimationDirection = -1;
      } else {
        if (this.appleAnimationScale > 80) this.appleAnimationScale -= 1;else this.appleAnimationDirection = 1;
      }

      this.drawImageOnTileWithScaleFactor(this.appleImage, apple, 0.01 * this.appleAnimationScale);
    }
  }, {
    key: 'drawImageOnTile',
    value: function drawImageOnTile(image, tile) {
      this.drawImageOnTileWithScaleFactor(image, tile, 1);
    }
  }, {
    key: 'drawImageOnTileWithScaleFactor',
    value: function drawImageOnTileWithScaleFactor(image, tile, scaleFactor) {
      var tileX = tile.x * this.tileWidth;
      var tileY = tile.y * this.tileHeight;

      var imageWidth = this.tileWidth * scaleFactor;
      var imageHeight = this.tileHeight * scaleFactor;
      var imageX = tileX - (imageWidth - this.tileWidth) / 2;
      var imageY = tileY - (imageHeight - this.tileHeight) / 2;

      this.gc.drawImage(image, imageX, imageY, imageWidth, imageHeight);
    }
  }, {
    key: 'drawTile',
    value: function drawTile(tile) {
      var tileX = tile.x * this.tileWidth;
      var tileY = tile.y * this.tileHeight;

      this.gc.fillRect(tileX, tileY, this.tileWidth, this.tileHeight);
    }
  }]);

  return CanvasHandler;
}();

exports.default = CanvasHandler;

},{"./core/config":3,"./model/tile":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ENABLE_WALLS: true,
  INITIAL_SNAKE_SIZE: 5, // must be less than X_TILES
  X_TILES: 21,
  Y_TILES: 21,
  BACKGROUND_COLOR_1: '#aed75b',
  BACKGROUND_COLOR_2: '#9fd24a',
  SNAKE_COLOR: 'purple',
  GAME_SPEED: 7,
  REFRESH_FPS: 60
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apple = require('./model/apple');

var _apple2 = _interopRequireDefault(_apple);

var _config = require('./core/config');

var _config2 = _interopRequireDefault(_config);

var _snake = require('./model/snake');

var _snake2 = _interopRequireDefault(_snake);

var _tile = require('./model/tile');

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(storageHandler) {
    _classCallCheck(this, Game);

    this.HIGHSCORE_STORAGE_KEY = 'highscore';

    this.storageHandler = storageHandler;
    this.readStorageContents();
  }

  _createClass(Game, [{
    key: 'registerUiHandler',
    value: function registerUiHandler(uiHandler) {
      this.uiHandler = uiHandler;
    }
  }, {
    key: 'readStorageContents',
    value: function readStorageContents() {
      this.highscore = this.storageHandler.get(this.HIGHSCORE_STORAGE_KEY, 0);
    }
  }, {
    key: 'newGame',
    value: function newGame() {
      this.score = 0;

      this.paused = true;
      this.gameover = false;

      this.snake = new _snake2.default();
      this.apple = _apple2.default.spawnApple(this.snake);

      this.dx = 1;
      this.dy = 0;

      this.uiHandler.updateUiControls();
    }
  }, {
    key: 'startPauseGame',
    value: function startPauseGame() {
      if (this.paused) this.startGame();else this.pauseGame();
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      var _this = this;

      if (this.gameover) return;

      if (this.paused) {
        this.paused = false;
        this.gameInterval = window.setInterval(function () {
          return _this.game();
        }, 1000 / _config2.default.GAME_SPEED);
      }
    }
  }, {
    key: 'pauseGame',
    value: function pauseGame() {
      this.paused = true;
      window.clearInterval(this.gameInterval);
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      this.pauseGame();
      this.gameover = true;

      this.uiHandler.showGameOverScreen();
    }
  }, {
    key: 'left',
    value: function left() {
      if (this.paused) this.startGame();

      if (this.snake.head().dx != 1) {
        this.dx = -1;
        this.dy = 0;
      }
    }
  }, {
    key: 'up',
    value: function up() {
      if (this.paused) this.startGame();

      if (this.snake.head().dy != 1) {
        this.startGame();
        this.dx = 0;
        this.dy = -1;
      }
    }
  }, {
    key: 'right',
    value: function right() {
      if (this.paused) this.startGame();

      if (this.snake.head().dx != -1) {
        this.startGame();
        this.dx = 1;
        this.dy = 0;
      }
    }
  }, {
    key: 'down',
    value: function down() {
      if (this.paused) this.startGame();

      if (this.snake.head().dy != -1) {
        this.startGame();
        this.dx = 0;
        this.dy = 1;
      }
    }
  }, {
    key: 'game',
    value: function game() {
      if (_config2.default.ENABLE_WALLS && this.snake.aboutToCollideWithWalls(this.dx, this.dy)) return this.endGame();

      // Snake eats an apple
      if (_tile2.default.collides(this.snake.head(), this.apple)) {
        this.snake.eatApple();
        this.apple = _apple2.default.spawnApple(this.snake);

        // Update score and highscore
        this.increaseScore(1);
      }

      // Move snake
      this.snake.move(this.dx, this.dy);
      this.snake.loopThroughWalls();

      // Snake collides with itself
      if (this.snake.collidesWithItself()) return this.endGame();
    }
  }, {
    key: 'increaseScore',
    value: function increaseScore(increment) {
      this.score += increment;
      if (this.score > this.highscore) this.setHighscore(this.score);

      this.uiHandler.updateUiControls();
    }
  }, {
    key: 'setHighscore',
    value: function setHighscore(highscore) {
      this.highscore = highscore;

      this.storageHandler.set(this.HIGHSCORE_STORAGE_KEY, this.highscore);
      this.uiHandler.updateUiControls();
    }
  }, {
    key: 'resetHighscore',
    value: function resetHighscore() {
      this.setHighscore(0);
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./core/config":3,"./model/apple":6,"./model/snake":7,"./model/tile":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardHandler = function () {
  function KeyboardHandler(game) {
    var _this = this;

    _classCallCheck(this, KeyboardHandler);

    this.game = game;

    window.addEventListener('keydown', function (event) {
      return _this.handleKeyEvent(event);
    });
  }

  _createClass(KeyboardHandler, [{
    key: 'handleKeyEvent',
    value: function handleKeyEvent(event) {
      switch (event.key) {
        case ' ':
        case 'Escape':
        case 'Esc':
        case 'p':
          {
            this.game.startPauseGame();
            break;
          }

        case 'ArrowLeft':
        case 'Left':
        case 'a':
          {
            this.game.left();
            break;
          }

        case 'ArrowUp':
        case 'Up':
        case 'w':
          {
            this.game.up();
            break;
          }

        case 'ArrowRight':
        case 'Right':
        case 'd':
          {
            this.game.right();
            break;
          }

        case 'ArrowDown':
        case 'Down':
        case 's':
          {
            this.game.down();
            break;
          }
      }
    }
  }]);

  return KeyboardHandler;
}();

exports.default = KeyboardHandler;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../core/config');

var _config2 = _interopRequireDefault(_config);

var _random = require('../util/random');

var _random2 = _interopRequireDefault(_random);

var _tile = require('./tile');

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Apple = function () {
  function Apple() {
    _classCallCheck(this, Apple);
  }

  _createClass(Apple, null, [{
    key: 'spawnApple',
    value: function spawnApple(snake) {
      var availableTiles = [];

      for (var y = 0; y < _config2.default.Y_TILES; y++) {
        for (var x = 0; x < _config2.default.X_TILES; x++) {
          var tile = new _tile2.default(x, y);

          if (!snake.collidesWith(tile)) {
            availableTiles.push(tile);
          }
        }
      }

      return (0, _random2.default)(availableTiles);
    }
  }]);

  return Apple;
}();

exports.default = Apple;

},{"../core/config":3,"../util/random":13,"./tile":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../core/config');

var _config2 = _interopRequireDefault(_config);

var _snake_body = require('./snake_body');

var _snake_body2 = _interopRequireDefault(_snake_body);

var _tile = require('./tile');

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snake = function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.snake = [];

    var head = new _snake_body2.default();
    head.x = _config2.default.INITIAL_SNAKE_SIZE - 1;
    head.y = Math.floor(_config2.default.Y_TILES / 2);
    head.dx = 1;
    head.dy = 0;

    this.append(head);

    for (var i = 1; i < _config2.default.INITIAL_SNAKE_SIZE; i++) {
      this.append(new _snake_body2.default(this.head().x - i, this.head().y, this.head().dx, this.head().dy));
    }
  }

  _createClass(Snake, [{
    key: 'size',
    value: function size() {
      return this.snake.length;
    }
  }, {
    key: 'head',
    value: function head() {
      return this.snake[0];
    }
  }, {
    key: 'tail',
    value: function tail() {
      return this.snake[this.snake.length - 1];
    }
  }, {
    key: 'move',
    value: function move(dx, dy) {
      this.prepend(new _snake_body2.default(this.head().x + dx, this.head().y + dy, dx, dy));
      this.dropLast();
    }
  }, {
    key: 'append',
    value: function append(snakeBody) {
      this.snake.push(snakeBody);
    }
  }, {
    key: 'prepend',
    value: function prepend(snakeBody) {
      this.snake.unshift(snakeBody);
    }
  }, {
    key: 'dropLast',
    value: function dropLast() {
      this.snake.pop();
    }
  }, {
    key: 'collidesWith',
    value: function collidesWith(tile) {
      return this.bodyCollidesWith(tile) || _tile2.default.collides(this.head(), tile);
    }
  }, {
    key: 'bodyCollidesWith',
    value: function bodyCollidesWith(tile) {
      if (this.snake.length < 2) return false;

      for (var i = 1; i < this.snake.length; i++) {
        if (_tile2.default.collides(this.snake[i], tile)) return true;
      }

      return false;
    }
  }, {
    key: 'collidesWithItself',
    value: function collidesWithItself() {
      return this.bodyCollidesWith(this.head());
    }
  }, {
    key: 'loopThroughWalls',
    value: function loopThroughWalls() {
      if (this.head().x < 0) this.snake[0].x = _config2.default.X_TILES - 1;
      if (this.head().x >= _config2.default.X_TILES) this.snake[0].x = 0;
      if (this.head().y < 0) this.snake[0].y = _config2.default.Y_TILES - 1;
      if (this.head().y >= _config2.default.Y_TILES) this.snake[0].y = 0;
    }
  }, {
    key: 'aboutToCollideWithWalls',
    value: function aboutToCollideWithWalls(dx, dy) {
      if (this.head().x + dx < 0) return true;
      if (this.head().x + dx >= _config2.default.X_TILES) return true;
      if (this.head().y + dy < 0) return true;
      if (this.head().y + dy >= _config2.default.Y_TILES) return true;

      return false;
    }
  }, {
    key: 'eatApple',
    value: function eatApple() {
      var tail = this.tail();
      this.append(new _snake_body2.default(tail.x + tail.dx, tail.y + tail.dy, tail.dx, tail.dy));
    }
  }]);

  return Snake;
}();

exports.default = Snake;

},{"../core/config":3,"./snake_body":8,"./tile":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tile = require('./tile');

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SnakeBody = function (_Tile) {
  _inherits(SnakeBody, _Tile);

  function SnakeBody(x, y, dx, dy) {
    _classCallCheck(this, SnakeBody);

    var _this = _possibleConstructorReturn(this, (SnakeBody.__proto__ || Object.getPrototypeOf(SnakeBody)).call(this, x, y));

    _this.dx = dx;
    _this.dy = dy;
    return _this;
  }

  return SnakeBody;
}(_tile2.default);

exports.default = SnakeBody;

},{"./tile":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../core/config');

var _config2 = _interopRequireDefault(_config);

var _random = require('../util/random');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
  _createClass(Tile, null, [{
    key: 'collides',
    value: function collides(tileA, tileB) {
      return tileA.x === tileB.x && tileA.y === tileB.y;
    }

    // Creates a tile object with specified x and y coordinate
    // or randomized coordinates if omitted

  }]);

  function Tile(x, y) {
    _classCallCheck(this, Tile);

    if (x == null && y == null) {
      this.randomize();
    } else {
      this.x = x;
      this.y = y;
    }
  }

  _createClass(Tile, [{
    key: 'randomize',
    value: function randomize() {
      this.x = (0, _random2.default)(_config2.default.X_TILES);
      this.y = (0, _random2.default)(_config2.default.Y_TILES);
    }
  }]);

  return Tile;
}();

exports.default = Tile;

},{"../core/config":3,"../util/random":13}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageHandler = function () {
  function StorageHandler() {
    _classCallCheck(this, StorageHandler);

    this.KEY_PREFIX = 'snake';
    this.KEY_SEPARATOR = '###';
  }

  _createClass(StorageHandler, [{
    key: 'get',
    value: function get(key, defaultValue) {
      return window.localStorage.getItem(this.KEY_PREFIX + this.KEY_SEPARATOR + key) || defaultValue;
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      window.localStorage.setItem(this.KEY_PREFIX + this.KEY_SEPARATOR + key, value);
    }
  }]);

  return StorageHandler;
}();

exports.default = StorageHandler;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TouchHandler = function () {
  function TouchHandler(canvasId, game) {
    var _this = this;

    _classCallCheck(this, TouchHandler);

    this.canvas = document.getElementById(canvasId);
    this.game = game;

    game.touchStartX = null;
    game.touchStartY = null;
    game.touchMoveX = null;
    game.touchMoveY = null;

    this.canvas.addEventListener('touchstart', function (event) {
      return _this.handleTouchStart(event);
    }, false);
    this.canvas.addEventListener('touchmove', function (event) {
      return _this.handleTouchMove(event);
    }, false);
  }

  _createClass(TouchHandler, [{
    key: 'handleTouchStart',
    value: function handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {
      if (this.touchStartX == null || this.touchStartY == null) return;

      this.touchMoveX = event.touches[0].clientX;
      this.touchMoveY = event.touches[0].clientY;

      this.handleTouchGesture();

      this.touchStartX = this.touchMoveX;
      this.touchStartY = this.touchMoveY;
    }
  }, {
    key: 'handleTouchGesture',
    value: function handleTouchGesture() {
      var dx = this.touchMoveX - this.touchStartX;
      var dy = this.touchMoveY - this.touchStartY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) this.game.left();else if (dx > 0) this.game.right();
      } else if (Math.abs(dx) < Math.abs(dy)) {
        if (dy < 0) this.game.up();else if (dy > 0) this.game.down();
      }
    }
  }]);

  return TouchHandler;
}();

exports.default = TouchHandler;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UiHandler = function () {
  function UiHandler(game) {
    _classCallCheck(this, UiHandler);

    this.game = game;
    this.gameWasRunning = false;

    this.uiControls = {
      OVERLAY: document.getElementById('js-overlay'),

      GAMEOVER_SCREEN: document.getElementById('js-gameover-screen'),
      GAMEOVER_SCREEN_BUTTON: document.getElementById('js-gameover-screen-button'),

      UI_CONTROLS_BAR: document.getElementById('js-ui-controls'),

      SCORE_LABEL: document.getElementById('js-score'),
      HIGHSCORE_LABEL: document.getElementById('js-highscore'),

      MENU_BUTTON: document.getElementById('js-menu-button'),
      MENU: document.getElementById('js-menu'),
      MENU_RESET_HIGHSCORE: document.getElementById('js-menu-reset-highscore')
    };

    this.setUpEventHandlers();
  }

  _createClass(UiHandler, [{
    key: 'setUpEventHandlers',
    value: function setUpEventHandlers() {
      var _this = this;

      this.uiControls.GAMEOVER_SCREEN_BUTTON.addEventListener('click', function () {
        return _this.newGame();
      });

      this.uiControls.MENU_BUTTON.addEventListener('click', function () {
        return _this.showMenu();
      });
      this.uiControls.MENU_RESET_HIGHSCORE.addEventListener('click', function () {
        return _this.resetHighscore();
      });
    }
  }, {
    key: 'updateUiControls',
    value: function updateUiControls() {
      this.updateScore();
      this.updateHighscore();
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      this.uiControls.SCORE_LABEL.innerHTML = this.game.score;
    }
  }, {
    key: 'updateHighscore',
    value: function updateHighscore() {
      this.uiControls.HIGHSCORE_LABEL.innerHTML = this.game.highscore;
    }
  }, {
    key: 'resetHighscore',
    value: function resetHighscore() {
      this.game.resetHighscore();
      this.hideMenu();
    }
  }, {
    key: 'showOverlay',
    value: function showOverlay(overlayClickHandler) {
      this.uiControls.OVERLAY.classList.add('overlay-shown');

      if (overlayClickHandler != null) this.uiControls.OVERLAY.addEventListener('click', overlayClickHandler);
    }
  }, {
    key: 'hideOverlay',
    value: function hideOverlay() {
      this.uiControls.OVERLAY.classList.remove('overlay-shown');

      // Clone overlay element to remove all existing click handlers
      // See https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type/19470348#19470348
      var overlayClone = this.uiControls.OVERLAY.cloneNode(true);
      this.uiControls.OVERLAY.parentNode.replaceChild(overlayClone, this.uiControls.OVERLAY);
      this.uiControls.OVERLAY = overlayClone;
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      var _this2 = this;

      this.gameWasRunning = !this.game.paused;
      this.game.pauseGame();

      this.showOverlay(function () {
        return _this2.hideMenu();
      });
      this.uiControls.MENU.classList.add('menu-shown');
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      this.hideOverlay();
      this.uiControls.MENU.classList.remove('menu-shown');

      if (this.gameWasRunning) this.game.startGame();
    }
  }, {
    key: 'showGameOverScreen',
    value: function showGameOverScreen() {
      this.showOverlay();
      this.uiControls.GAMEOVER_SCREEN.classList.add('gameover-screen-shown');
    }
  }, {
    key: 'newGame',
    value: function newGame() {
      this.hideOverlay();
      this.uiControls.GAMEOVER_SCREEN.classList.remove('gameover-screen-shown');

      this.game.newGame();
    }
  }]);

  return UiHandler;
}();

exports.default = UiHandler;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var random = Math.random();

  if (arguments.length == 1 && typeof arguments[0] == 'number') {
    var upper = arguments[0];
    return Math.floor(random * upper);
  }

  if (arguments.length == 1 && arguments[0] instanceof Array) {
    var choices = arguments[0];
    return choices[Math.floor(random * choices.length)];
  }

  if (arguments.length == 2 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
    var lower = arguments[0];
    var _upper = arguments[1];

    return Math.floor(random * (_upper - lower) + lower);
  }

  return random;
};

},{}]},{},[1]);
