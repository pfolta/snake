module.exports = (function() {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function randomArrayElement(choices) {
    let randomIndex = randomInt(0, choices.length);
    return choices[randomIndex];
  }

  /**
   * Returns a random integer or floating-point number.
   *
   * Takes either 0, 1 or 2 arguments.
   *
   * If no argument is given, returns a random floating-point number from 0 up to (but not including) 1.
   * If one argument is given and it is a number, returns a random integer from 0 up to (but not including) the number.
   * If one argument is given and it is an array, returns a random element from that array.
   * If two arguments are given, returns a random integer from the first argument up to (but not including) the second
   *   argument.
   *
   * @method random
   * @param  {Number}  [min]  the lower bound (inclusive)
   * @param  {Number}  [max]  the upper bound (exclusive)
   * @return {Number}  the random number
   */
  /**
   * @method random
   * @param  {Array}  [choices]  the array to choose from
   * @return {*}      the random element from the array
   */
  function random() {
    if (arguments.length == 1 && typeof arguments[0] == 'number') {
      return randomInt(0, arguments[0]);
    }

    if (arguments.length == 1 && arguments[0] instanceof Array) {
      return randomArrayElement(arguments[0]);
    }

    if (arguments.length == 2 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
      return randomInt(arguments[0], arguments[1]);
    }

    return Math.random();
  }

  return {
    random: random
  };
})();
