import config from '../../../src/app/scripts/core/config';

const assert = require('chai').assert;

describe('Config', function() {
  describe('INITIAL_SNAKE_SIZE', function() {
    it('should be a number', function() {
      assert.isNumber(config.INITIAL_SNAKE_SIZE);
    });

    it('should be less than config.X_TILES', function() {
      assert.isBelow(config.INITIAL_SNAKE_SIZE, config.X_TILES);
    });
  });
});
