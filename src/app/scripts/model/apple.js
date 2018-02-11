import Random from '../util/random';
import Tile from './tile';

let GameConfig = require('../game_config');

export default class Apple {
  static spawnApple(snake) {
    let availableTiles = [];

    for (let y = 0; y < GameConfig.Y_TILES; y++) {
      for (let x = 0; x < GameConfig.X_TILES; x++) {
        let tile = new Tile(x, y);

        if (!snake.collidesWith(tile)) {
          availableTiles.push(tile);
        }
      }
    }

    let randomTile = Random.random(availableTiles);
    return new Tile(randomTile.x, randomTile.y);
  }
}
