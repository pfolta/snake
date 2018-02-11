const assert = require('chai').assert;

import Snake from '../../src/app/scripts/snake';
import SnakeBody from '../../src/app/scripts/snake_body';
import Tile from '../../src/app/scripts/tile';

const GameConfig = require('../../src/app/scripts/game_config');

describe('Snake', function() {
  describe('new Snake()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should create a snake', function() {
      assert.isObject(snake);
    });

    it('should have size GameConfig.INITIAL_SNAKE_SIZE', function() {
      assert.equal(snake.size(), GameConfig.INITIAL_SNAKE_SIZE);
    });
  });

  describe('size()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.size);
    });

    it('should return a number', function() {
      assert.isNumber(snake.size());
    });
  });

  describe('head()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.head);
    });

    it('should return a SnakeBody object', function() {
      assert.instanceOf(snake.head(), SnakeBody);
    });
  });

  describe('tail()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.tail);
    });

    it('should return a SnakeBody object', function() {
      assert.instanceOf(snake.tail(), SnakeBody);
    });
  });

  describe('move(1, 0)', function() {
    let snake;
    let dx;
    let dy;

    beforeEach(function() {
      snake = new Snake();
      dx = 1;
      dy = 0;
    });

    it('should be a function', function() {
      assert.isFunction(snake.move);
    });

    it('should not change the snake size', function() {
      let sizeBeforeMove = snake.size();
      snake.move(dx, dy);
      let sizeAfterMove = snake.size();
      assert.equal(sizeAfterMove, sizeBeforeMove);
    });
  });

  describe('append(snakeBody)', function() {
    let snake;
    let snakeBody;

    beforeEach(function() {
      snake = new Snake();
      snakeBody = new SnakeBody(1, 2, 1, 0);
    });

    it('should be a function', function() {
      assert.isFunction(snake.append);
    });

    it('should increase the snake size by 1', function() {
      let sizeBeforeAppend = snake.size();
      snake.append(snakeBody);
      let sizeAfterAppend = snake.size();
      assert.equal(sizeAfterAppend, sizeBeforeAppend + 1);
    });

    it('should append the snake body part at the end of the snake', function() {
      snake.append(snakeBody);
      assert.equal(snake.tail(), snakeBody);
    });
  });

  describe('prepend(snakeBody)', function() {
    let snake;
    let snakeBody;

    beforeEach(function() {
      snake = new Snake();
      snakeBody = new SnakeBody(1, 2, 1, 0);
    });

    it('should be a function', function() {
      assert.isFunction(snake.prepend);
    });

    it('should increase the snake size by 1', function() {
      let sizeBeforeAppend = snake.size();
      snake.prepend(snakeBody);
      let sizeAfterAppend = snake.size();
      assert.equal(sizeAfterAppend, sizeBeforeAppend + 1);
    });

    it('should prepend the snake body part at the start of the snake', function() {
      snake.prepend(snakeBody);
      assert.equal(snake.head(), snakeBody);
    });
  });

  describe('dropLast()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.dropLast);
    });

    it('should decrease the snake size by 1', function() {
      let sizeBeforeDropLast = snake.size();
      snake.dropLast();
      let sizeAfterDropLast = snake.size();
      assert.equal(sizeAfterDropLast, sizeBeforeDropLast - 1);
    });
  });

  describe('collidesWith(tile)', function() {
    let snake;
    let tile;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.collidesWith);
    });

    it('should return false if tile is not part of the snake', function() {
      tile = new Tile(1, 2);
      assert.isFalse(snake.collidesWith(tile));
    });

    it('should return true if tile is part of the snake', function() {
      tile = new Tile(2, Math.floor(GameConfig.Y_TILES / 2));
      assert.isTrue(snake.collidesWith(tile));
    });
  });

  describe('collidesWithItself()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.collidesWithItself);
    });

    it('should return false if the head does not collide with the rest of the snake', function() {
      assert.isFalse(snake.collidesWithItself());
    });

    it('should return true if the head collides with the rest of the snake', function() {
      // Move snake up, left, down to hit itself
      snake.move(0, -1);
      snake.move(-1, 0);
      snake.move(0, 1);

      assert.isTrue(snake.collidesWithItself());
    });
  });

  describe('loopThroughWalls()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.loopThroughWalls);
    });

    it('should loop through the left wall', function() {
      // Move snake up and then left to 0
      snake.move(0, -1);

      let snakeHeadX = snake.head().x;
      for (let i = 0; i < snakeHeadX; i++) {
        snake.move(-1, 0);
      }

      // Move snake left one more time
      snake.move(-1, 0);

      snake.loopThroughWalls();
      assert.equal(snake.head().x, GameConfig.X_TILES - 1);
    });

    it('should loop through the right wall', function() {
      // Move snake right to GameConfig.X_TILES
      let snakeHeadX = snake.head().x;
      for (let i = 0; i < (GameConfig.X_TILES - snakeHeadX); i++) {
        snake.move(1, 0);
      }

      // Move snake right one more time
      snake.move(1, 0);

      snake.loopThroughWalls();
      assert.equal(snake.head().x, 0);
    });

    it('should loop through the top wall', function() {
      // Move snake up to 0
      let snakeHeadY = snake.head().y;
      for (let i = 0; i < snakeHeadY; i++) {
        snake.move(0, -1);
      }

      // Move snake up one more time
      snake.move(0, -1);

      snake.loopThroughWalls();
      assert.equal(snake.head().y, GameConfig.Y_TILES - 1);
    });

    it('should loop through the bottom wall', function() {
      // Move snake down to GameConfig.Y_TILES
      let snakeHeadY = snake.head().x;
      for (let i = 0; i < (GameConfig.Y_TILES - snakeHeadY); i++) {
        snake.move(0, 1);
      }

      // Move snake down one more time
      snake.move(0, 1);

      snake.loopThroughWalls();
      assert.equal(snake.head().y, 0);
    });
  });

  describe('aboutToCollideWithWalls(dx, dy)', function() {
    let snake;
    let dx;
    let dy;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.aboutToCollideWithWalls);
    });

    it('should return false if not about to collide with any walls', function() {
      dx = 1;
      dy = 0;

      assert.isFalse(snake.aboutToCollideWithWalls(dx, dy));
    });
  });

  describe('eatApple()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should be a function', function() {
      assert.isFunction(snake.eatApple);
    });

    it('should increase the snake size by 1', function() {
      let sizeBeforeEatApple = snake.size();
      snake.eatApple();
      let sizeAfterEatApple = snake.size();
      assert.equal(sizeAfterEatApple, sizeBeforeEatApple + 1);
    });
  });
});
