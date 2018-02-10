const assert = require('chai').assert;

import Random from '../../../src/app/scripts/util/random';

describe('Random', () => {
  describe('random()', () => {
    it('should return a number', () => {
      let result = Random.random();
      assert.isNumber(result);
    });

    it('should return a number 0 <= n < 1', () => {
      let result = Random.random();
      assert.isAtLeast(result, 0);
      assert.isBelow(result, 1);
    });
  });

  describe('random(5)', () => {
    it('should return a number', () => {
      let result = Random.random(5);
      assert.isNumber(result);
    });

    it('should return a number 0 <= n < 5', () => {
      let result = Random.random(5);
      assert.isAtLeast(result, 0);
      assert.isBelow(result, 5);
    });
  });

  describe('random(1, 10)', () => {
    it('should return a number', () => {
      let result = Random.random(1, 10);
      assert.isNumber(result);
    });

    it('should return a number 1 <= n < 10', () => {
      let result = Random.random(1, 10);
      assert.isAtLeast(result, 1);
      assert.isBelow(result, 10);
    });
  });

  describe('random(["apple", "pear", "orange", "grape"])', () => {
    it('should return a fruit', () => {
      let fruits = ['apple', 'pear', 'orange', 'grape'];
      let result = Random.random(fruits);
      assert.include(fruits, result);
    });
  });
});
