class Snake {
  // Creates a new snake at a random location with configured initial length
  constructor() {
    this.snake = [];

    let head = new Tile();
    head.x = Math.max(head.x, (GameConfig.INITIAL_SNAKE_SIZE + GameConfig.INITIAL_MIN_SNAKE_WALL_DISTANCE) - 1);
    head.x = Math.min(head.x, GameConfig.X_TILES - GameConfig.INITIAL_MIN_SNAKE_WALL_DISTANCE - 1);

    head.y = Math.max(head.y, GameConfig.INITIAL_MIN_SNAKE_WALL_DISTANCE);
    head.y = Math.min(head.y, GameConfig.Y_TILES - GameConfig.INITIAL_MIN_SNAKE_WALL_DISTANCE - 1);

    this.append(head);

    for (let i = 1; i < GameConfig.INITIAL_SNAKE_SIZE; i++) {
      this.append(new Tile(this.head().x - i, this.head().y));
    }
  }

  head() {
    return this.snake[0];
  }

  move(dx, dy) {
    this.prepend(new Tile(this.head().x + dx, this.head().y + dy));
    this.dropLast();
  }

  append(tile) {
    this.snake.push(tile);
  }

  prepend(tile) {
    this.snake.unshift(tile);
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

  handleWalls() {
    if (this.head().x < 0) this.snake[0].x = GameConfig.X_TILES - 1;
    if (this.head().x >= GameConfig.X_TILES) this.snake[0].x = 0;
    if (this.head().y < 0) this.snake[0].y = GameConfig.Y_TILES - 1;
    if (this.head().y >= GameConfig.Y_TILES) this.snake[0].y = 0;
  }

  eatApple(dx, dy) {
    this.prepend(new Tile(this.head().x + dx, this.head().y + dy));
  }

  toString() {
    return this.snake.toString();
  }
}
