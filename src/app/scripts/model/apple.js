import config from '../core/config';
import random from '../util/random';
import Tile from './tile';

export default class Apple {
  static spawnApple(snake) {
    let availableTiles = [];

    for (let y = 0; y < config.Y_TILES; y++) {
      for (let x = 0; x < config.X_TILES; x++) {
        let tile = new Tile(x, y);

        if (!snake.collidesWith(tile)) {
          availableTiles.push(tile);
        }
      }
    }

    return random(availableTiles);
  }
}
