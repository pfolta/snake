/**
 * Returns a random integer or floating-point number.
 *
 * Takes either 0, 1 or 2 arguments.
 *
 * If no argument is given, returns a random floating-point number from 0 up to (but not including) 1.
 * If one argument is given and it is a number, returns a random integer from 0 up to (but not including) the number.
 * If two arguments are given, returns a random integer from the first argument up to (but not including) the second
 *   argument.
 *
 * @method random
 * @param  {Number}  [lower]  the lower bound (inclusive)
 * @param  {Number}  [upper]  the upper bound (exclusive)
 * @return {Number}  the random number
 */
/**
 * Returns a random element from an array.
 *
 * If one argument is given and it is an array, returns a random element from that array.
 *
 * @method random
 * @param  {Array}  [choices]  the array to choose from
 * @return {*}      the random element from the array
 */
export default function () {
  const random = Math.random();

  if (arguments.length == 1 && typeof arguments[0] == 'number') {
    const upper = arguments[0];
    return Math.floor(random * upper);
  }

  if (arguments.length == 1 && arguments[0] instanceof Array) {
    const choices = arguments[0];
    return choices[Math.floor(random * choices.length)];
  }

  if (arguments.length == 2 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
    const lower = arguments[0];
    const upper = arguments[1];

    return Math.floor(random * (upper - lower) + lower);
  }

  return random;
}
