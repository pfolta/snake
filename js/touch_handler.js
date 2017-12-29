class TouchHandler {
  constructor(game) {
    this.game = game;

    game.touchStartX = 0;
    game.touchStartY = 0;
    game.touchMoveX = 0;
    game.touchMoveY = 0;

    window.addEventListener("touchstart", (event) => this.handleTouchStart(event), false);
    window.addEventListener("touchmove", (event) => this.handleTouchMove(event), false);
  }

  handleTouchStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  handleTouchMove(event) {
    this.touchMoveX = event.changedTouches[0].screenX;
    this.touchMoveY = event.changedTouches[0].screenY;

    this.handleTouchGesture();

    this.touchStartX = this.touchMoveX;
    this.touchStartY = this.touchMoveY;
  }

  handleTouchGesture() {
    let threshold = 0;

    let dx = this.touchMoveX - this.touchStartX;
    let dy = this.touchMoveY - this.touchStartY;

    if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) this.game.left();
        else if (dx > 0) this.game.right();
      } else if (Math.abs(dx) < Math.abs(dy)) {
        if (dy < 0) this.game.up();
        else if (dy > 0) this.game.down();
      }
    }
  }
}
