import config from '../core/config';
import SnakeBody from './snake_body';
import Tile from './tile';

export default class Snake {
  constructor() {
    this.snake = [];

    let head = new SnakeBody();
    head.x = config.INITIAL_SNAKE_SIZE - 1;
    head.y = Math.floor(config.Y_TILES / 2);
    head.dx = 1;
    head.dy = 0;

    this.append(head);

    for (let i = 1; i < config.INITIAL_SNAKE_SIZE; i++) {
      this.append(new SnakeBody(this.head().x - i, this.head().y, this.head().dx, this.head().dy));
    }
  }

  size() {
    return this.snake.length;
  }

  head() {
    return this.snake[0];
  }

  tail() {
    return this.snake[this.snake.length - 1];
  }

  move(dx, dy) {
    this.prepend(new SnakeBody(this.head().x + dx, this.head().y + dy, dx, dy));
    this.dropLast();
  }

  append(snakeBody) {
    this.snake.push(snakeBody);
  }

  prepend(snakeBody) {
    this.snake.unshift(snakeBody);
  }

  dropLast() {
    this.snake.pop();
  }

  collidesWith(tile) {
    return this.bodyCollidesWith(tile) || Tile.collides(this.head(), tile);
  }

  bodyCollidesWith(tile) {
    if (this.snake.length < 2) return false;

    for (let i = 1; i < this.snake.length; i++) {
      if (Tile.collides(this.snake[i], tile)) return true;
    }

    return false;
  }

  collidesWithItself() {
    return this.bodyCollidesWith(this.head());
  }

  loopThroughWalls() {
    if (this.head().x < 0) this.snake[0].x = config.X_TILES - 1;
    if (this.head().x >= config.X_TILES) this.snake[0].x = 0;
    if (this.head().y < 0) this.snake[0].y = config.Y_TILES - 1;
    if (this.head().y >= config.Y_TILES) this.snake[0].y = 0;
  }

  aboutToCollideWithWalls(dx, dy) {
    if (this.head().x + dx < 0) return true;
    if (this.head().x + dx >= config.X_TILES) return true;
    if (this.head().y + dy < 0) return true;
    if (this.head().y + dy >= config.Y_TILES) return true;

    return false;
  }

  eatApple() {
    let tail = this.tail();
    this.append(new SnakeBody(tail.x + tail.dx, tail.y + tail.dy, tail.dx, tail.dy));
  }
}
