const assert = require('chai').assert;

import Tile from '../../src/app/scripts/tile';
const GameConfig = require('../../src/app/scripts/game_config');

describe('Tile', () => {
  describe('new Tile()', () => {
    let tile;

    beforeEach(() => {
      tile = new Tile();
    });

    it('should create a tile', () => {
      assert.isObject(tile);
    });

    it('should have x and y coordinates', () => {
      assert.isNumber(tile.x);
      assert.isNumber(tile.y);
    });

    it('should have x coordinate 0 <= x <= GameConfig.X_TILES', () => {
      assert.isAtLeast(tile.x, 0);
      assert.isAtMost(tile.x, GameConfig.X_TILES);
    });

    it('should have y coordinate 0 <= y <= GameConfig.Y_TILES', () => {
      assert.isAtLeast(tile.y, 0);
      assert.isAtMost(tile.y, GameConfig.Y_TILES);
    });
  });

  describe('new Tile(1, 2)', () => {
    let tile;

    beforeEach(() => {
      tile = new Tile(1, 2);
    });

    it('should create a tile', () => {
      assert.isObject(tile);
    });

    it('should set x coordinate to 1', () => {
      assert.equal(tile.x, 1);
    });

    it('should set y coordinate to 2', () => {
      assert.equal(tile.y, 2);
    });
  });

  describe('collides(tileA, tileB)', () => {
    let tileA;
    let tileB;

    it('should return false for two different tiles', () => {
      tileA = new Tile(1, 2);
      tileB = new Tile(3, 4);
      assert.isFalse(Tile.collides(tileA, tileB));
    });

    it('should return false if only x coordinate is the same', () => {
      tileA = new Tile(1, 2);
      tileB = new Tile(1, 3);
      assert.isFalse(Tile.collides(tileA, tileB));
    });

    it('should return false if only y coordinate is the same', () => {
      tileA = new Tile(1, 3);
      tileB = new Tile(2, 3);
      assert.isFalse(Tile.collides(tileA, tileB));
    });

    it('should return true for two tiles with the same coordinates', () => {
      tileA = new Tile(1, 2);
      tileB = new Tile(1, 2);
      assert.isTrue(Tile.collides(tileA, tileB));
    });
  });
});
