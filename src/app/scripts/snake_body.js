import Tile from "./tile";

export default class SnakeBody extends Tile {
  constructor(x, y, dx, dy) {
    super(x, y);

    this.dx = dx;
    this.dy = dy;
  }
}
