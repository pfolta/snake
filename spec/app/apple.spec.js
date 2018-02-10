const assert = require('chai').assert;

import Apple from '../../src/app/scripts/apple';
import Snake from '../../src/app/scripts/snake';
import Tile from '../../src/app/scripts/tile';

const GameConfig = require('../../src/app/scripts/game_config');

describe('Apple', () => {
  describe('spawnApple()', () => {
    let snake;

    beforeEach(() => {
      snake = new Snake();
    });

    it('should be a function', () => {
      assert.isFunction(Apple.spawnApple);
    });

    it('should return a tile', () => {
      assert.instanceOf(Apple.spawnApple(snake), Tile);
    });

    it('should have x coordinate 0 <= x <= GameConfig.X_TILES', () => {
      assert.isAtLeast(Apple.spawnApple(snake).x, 0);
      assert.isAtMost(Apple.spawnApple(snake).x, GameConfig.X_TILES);
    });

    it('should have y coordinate 0 <= y <= GameConfig.Y_TILES', () => {
      assert.isAtLeast(Apple.spawnApple(snake).y, 0);
      assert.isAtMost(Apple.spawnApple(snake).y, GameConfig.Y_TILES);
    });

    it('should not collide with the snake', () => {
      assert.isFalse(snake.collidesWith(Apple.spawnApple(snake)));
    });
  });
});
