class TouchHandler {
  constructor(game) {
    this.game = game;

    game.touchStartX = 0;
    game.touchStartY = 0;
    game.touchEndX = 0;
    game.touchEndY = 0;

    window.addEventListener("touchstart", (event) => this.handleTouchStart(event), false);
    window.addEventListener("touchend", (event) => this.handleTouchEnd(event), false);
  }

  handleTouchStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  handleTouchEnd(event) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;

    this.handleTouchGesture();
  }

  handleTouchGesture() {
    let dx = this.touchEndX - this.touchStartX;
    let dy = this.touchEndY - this.touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) this.game.left();
      else if (dx > 0) this.game.right();
    } else {
      if (dy < 0) this.game.up();
      else if (dy > 0) this.game.down();
    }
  }
}
