import Random from '../util/random';

let GameConfig = require('../game_config');

export default class Tile {
  static collides(tileA, tileB) {
    if (tileA.x === tileB.x && tileA.y === tileB.y) return true;
    return false;
  }

  // Creates a tile object with specified x and y coordinate
  // or randomized coordinates if omitted
  constructor(x, y) {
    if (x == null && y == null) {
      this.randomize();
    } else {
      this.x = x;
      this.y = y;
    }
  }

  randomize() {
    this.x = Random.random(GameConfig.X_TILES);
    this.y = Random.random(GameConfig.Y_TILES);
  }
}
