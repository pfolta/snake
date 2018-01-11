import Tile from "./tile";

export default class Apple extends Tile {
  constructor(snake) {
    super();

    // Ensure apple doesn't spawn on top of the snake
    while (snake.collidesWith(this)) this.randomize();
  }
}
