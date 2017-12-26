class Tile {
  static collides(tileA, tileB) {
    if (tileA.x == tileB.x && tileA.y == tileB.y) return true;
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
    this.x = Math.floor(GameConfig.X_TILES * Math.random());
    this.y = Math.floor(GameConfig.Y_TILES * Math.random());
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
