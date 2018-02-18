import Apple from '../../../src/app/scripts/model/apple';
import config from '../../../src/app/scripts/core/config';
import Snake from '../../../src/app/scripts/model/snake';
import Tile from '../../../src/app/scripts/model/tile';

const assert = require('chai').assert;

describe('Apple', function() {
  describe('spawnApple()', function() {
    let snake;

    beforeEach(function() {
      snake = new Snake();
    });

    it('should return a tile', function() {
      assert.instanceOf(Apple.spawnApple(snake), Tile);
    });

    it('should have x coordinate 0 <= x <= config.X_TILES', function() {
      assert.isAtLeast(Apple.spawnApple(snake).x, 0);
      assert.isAtMost(Apple.spawnApple(snake).x, config.X_TILES);
    });

    it('should have y coordinate 0 <= y <= config.Y_TILES', function() {
      assert.isAtLeast(Apple.spawnApple(snake).y, 0);
      assert.isAtMost(Apple.spawnApple(snake).y, config.Y_TILES);
    });

    it('should not collide with the snake', function() {
      assert.isFalse(snake.collidesWith(Apple.spawnApple(snake)));
    });
  });
});
