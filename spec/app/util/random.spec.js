const assert = require('chai').assert;

import Random from '../../../src/app/scripts/util/random';

describe('Random', function() {
  describe('random()', function() {
    let result;

    beforeEach(function() {
      result = Random.random();
    });

    it('should return a number', function() {
      assert.isNumber(result);
    });

    it('should return a number 0 <= n < 1', function() {
      assert.isAtLeast(result, 0);
      assert.isBelow(result, 1);
    });
  });

  describe('random(5)', function() {
    let result;

    beforeEach(function() {
      result = Random.random(5);
    });

    it('should return a number', function() {
      assert.isNumber(result);
    });

    it('should return a number 0 <= n < 5', function() {
      assert.isAtLeast(result, 0);
      assert.isBelow(result, 5);
    });
  });

  describe('random(1, 10)', function() {
    let result;

    beforeEach(function() {
      result = Random.random(1, 10);
    });

    it('should return a number', function() {
      assert.isNumber(result);
    });

    it('should return a number 1 <= n < 10', function() {
      assert.isAtLeast(result, 1);
      assert.isBelow(result, 10);
    });
  });

  describe('random(["apple", "pear", "orange", "grape"])', function() {
    it('should return a fruit', function() {
      let fruits = ['apple', 'pear', 'orange', 'grape'];
      let result = Random.random(fruits);
      assert.include(fruits, result);
    });
  });
});
