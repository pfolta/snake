export default class Random {
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static randomArrayElement(array) {
    let randomIndex = Random.randomInt(0, array.length - 1);
    return array[randomIndex];
  }
}
