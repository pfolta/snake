import config from '../../../src/app/scripts/core/config';
import Tile from '../../../src/app/scripts/model/tile';

const assert = require('chai').assert;

describe('Tile', function() {
  describe('new Tile()', function() {
    let tile;

    beforeEach(function() {
      tile = new Tile();
    });

    it('should create a tile', function() {
      assert.isObject(tile);
    });

    it('should have x and y coordinates', function() {
      assert.isNumber(tile.x);
      assert.isNumber(tile.y);
    });

    it('should have x coordinate 0 <= x <= config.X_TILES', function() {
      assert.isAtLeast(tile.x, 0);
      assert.isAtMost(tile.x, config.X_TILES);
    });

    it('should have y coordinate 0 <= y <= config.Y_TILES', function() {
      assert.isAtLeast(tile.y, 0);
      assert.isAtMost(tile.y, config.Y_TILES);
    });
  });

  describe('new Tile(1, 2)', function() {
    let tile;

    beforeEach(function() {
      tile = new Tile(1, 2);
    });

    it('should create a tile', function() {
      assert.isObject(tile);
    });

    it('should set x coordinate to 1', function() {
      assert.equal(tile.x, 1);
    });

    it('should set y coordinate to 2', function() {
      assert.equal(tile.y, 2);
    });
  });

  describe('collides(tileA, tileB)', function() {
    let tileA;
    let tileB;

    it('should return false for two different tiles', function() {
      tileA = new Tile(1, 2);
      tileB = new Tile(3, 4);
      assert.isFalse(Tile.collides(tileA, tileB));
    });

    it('should return false if only x coordinate is the same', function() {
      tileA = new Tile(1, 2);
      tileB = new Tile(1, 3);
      assert.isFalse(Tile.collides(tileA, tileB));
    });

    it('should return false if only y coordinate is the same', function() {
      tileA = new Tile(1, 3);
      tileB = new Tile(2, 3);
      assert.isFalse(Tile.collides(tileA, tileB));
    });

    it('should return true for two tiles with the same coordinates', function() {
      tileA = new Tile(1, 2);
      tileB = new Tile(1, 2);
      assert.isTrue(Tile.collides(tileA, tileB));
    });
  });
});
