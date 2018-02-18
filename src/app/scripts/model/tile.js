import config from '../core/config';
import random from '../util/random';

export default class Tile {
  static collides(tileA, tileB) {
    return (tileA.x === tileB.x && tileA.y === tileB.y);
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
    this.x = random(config.X_TILES);
    this.y = random(config.Y_TILES);
  }
}
