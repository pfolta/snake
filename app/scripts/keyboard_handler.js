export default class KeyboardHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (event) => this.handleKeyEvent(event));
  }

  handleKeyEvent(event) {
    switch (event.key) {
      case " ":
      case "Escape":
      case "Esc":
      case "p": {
        this.game.startPauseGame();
        break;
      }

      case "ArrowLeft":
      case "Left":
      case "a": {
        this.game.left();
        break;
      }

      case "ArrowUp":
      case "Up":
      case "w": {
        this.game.up();
        break;
      }

      case "ArrowRight":
      case "Right":
      case "d": {
        this.game.right();
        break;
      }

      case "ArrowDown":
      case "Down":
      case "s": {
        this.game.down();
        break;
      }
    }
  }
}
