export default class UiHandler {
  constructor(game) {
    this.game = game;
    this.gameWasRunning = false;

    this.uiControls = {
      OVERLAY: document.getElementById("js-overlay"),

      GAMEOVER_SCREEN: document.getElementById("js-gameover-screen"),
      GAMEOVER_SCREEN_BUTTON: document.getElementById("js-gameover-screen-button"),

      UI_CONTROLS_BAR: document.getElementById("js-ui-controls"),

      SCORE_LABEL: document.getElementById("js-score"),
      HIGHSCORE_LABEL: document.getElementById("js-highscore"),

      MENU_BUTTON: document.getElementById("js-menu-button"),
      MENU: document.getElementById("js-menu"),
      MENU_RESET_HIGHSCORE: document.getElementById("js-menu-reset-highscore"),
    };

    this.setUpEventHandlers();
  }

  setUpEventHandlers() {
    this.uiControls.GAMEOVER_SCREEN_BUTTON.addEventListener("click", () => this.newGame());

    this.uiControls.MENU_BUTTON.addEventListener("click", () => this.showMenu());
    this.uiControls.MENU_RESET_HIGHSCORE.addEventListener("click", () => this.resetHighscore());
  }

  updateUiControls() {
    this.updateScore();
    this.updateHighscore();
  }

  updateScore() {
    this.uiControls.SCORE_LABEL.innerHTML = this.game.score;
  }

  updateHighscore() {
    this.uiControls.HIGHSCORE_LABEL.innerHTML = this.game.highscore;
  }

  resetHighscore() {
    this.game.resetHighscore();
    this.hideMenu();
  }

  showOverlay(overlayClickHandler) {
    this.uiControls.OVERLAY.classList.add("overlay-shown");

    if (overlayClickHandler != null) this.uiControls.OVERLAY.addEventListener("click", overlayClickHandler);
  }

  hideOverlay() {
    this.uiControls.OVERLAY.classList.remove("overlay-shown");

    // Clone overlay element to remove all existing click handlers
    // See https://stackoverflow.com/questions/19469881/remove-all-event-listeners-of-specific-type/19470348#19470348
    let overlayClone = this.uiControls.OVERLAY.cloneNode(true);
    this.uiControls.OVERLAY.parentNode.replaceChild(overlayClone, this.uiControls.OVERLAY);
    this.uiControls.OVERLAY = overlayClone;
  }

  showMenu() {
    this.gameWasRunning = !this.game.paused;
    this.game.pauseGame();

    this.showOverlay(() => this.hideMenu());
    this.uiControls.MENU.classList.add("menu-shown");
  }

  hideMenu() {
    this.hideOverlay();
    this.uiControls.MENU.classList.remove("menu-shown");

    if (this.gameWasRunning) this.game.startGame();
  }

  showGameOverScreen() {
    this.showOverlay();
    this.uiControls.GAMEOVER_SCREEN.classList.add("gameover-screen-shown");
  }

  newGame() {
    this.hideOverlay();
    this.uiControls.GAMEOVER_SCREEN.classList.remove("gameover-screen-shown");

    this.game.newGame();
  }
}
