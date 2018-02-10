export default class Random {
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static randomArrayElement(array) {
    let randomIndex = Random.random(array.length);
    return array[randomIndex];
  }

  static random() {
    if (arguments.length == 1 && arguments[0] instanceof Array) {
      return Random.randomArrayElement(arguments[0]);
    }

    if (arguments.length == 1 && typeof arguments[0] == 'number') {
      return Random.randomInt(0, arguments[0]);
    }

    if (arguments.length == 2 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
      return Random.randomInt(arguments[0], arguments[1]);
    }

    return Math.random();
  }
}
