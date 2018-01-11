export default class TouchHandler {
  constructor(canvasId, game) {
    this.canvas = document.getElementById(canvasId);
    this.game = game;

    game.touchStartX = null;
    game.touchStartY = null;
    game.touchMoveX = null;
    game.touchMoveY = null;

    this.canvas.addEventListener("touchstart", (event) => this.handleTouchStart(event), false);
    this.canvas.addEventListener("touchmove", (event) => this.handleTouchMove(event), false);
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  handleTouchMove(event) {
    if (this.touchStartX == null || this.touchStartY == null) return;

    this.touchMoveX = event.touches[0].clientX;
    this.touchMoveY = event.touches[0].clientY;

    this.handleTouchGesture();

    this.touchStartX = this.touchMoveX;
    this.touchStartY = this.touchMoveY;
  }

  handleTouchGesture() {
    let dx = this.touchMoveX - this.touchStartX;
    let dy = this.touchMoveY - this.touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) this.game.left();
      else if (dx > 0) this.game.right();
    } else if (Math.abs(dx) < Math.abs(dy)) {
      if (dy < 0) this.game.up();
      else if (dy > 0) this.game.down();
    }
  }
}
