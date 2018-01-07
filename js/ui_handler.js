class UiHandler {
  constructor(game) {
    this.game = game;

    this.uiControls = {
      OVERLAY: document.getElementById("js-overlay"),

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
    this.uiControls.MENU_BUTTON.addEventListener("click", (event) => this.showMenu());
    this.uiControls.MENU_RESET_HIGHSCORE.addEventListener("click", (event) => this.resetHighscore());
  }

  updateUiControls() {
    this.updateScore(this.game.score);
    this.updateHighscore(this.game.highscore);
  }

  updateScore(score) {
    this.uiControls.SCORE_LABEL.innerHTML = score;
  }

  updateHighscore(highscore) {
    this.uiControls.HIGHSCORE_LABEL.innerHTML = highscore;
  }

  showMenu() {
    this.uiControls.OVERLAY.classList.add("overlay-shown");
    this.uiControls.OVERLAY.addEventListener("click", (event) => this.hideMenu());

    this.uiControls.MENU.classList.add("menu-shown");
  }

  hideMenu() {
    this.uiControls.OVERLAY.classList.remove("overlay-shown");
    this.uiControls.OVERLAY.removeEventListener("click", (event) => this.hideMenu());

    this.uiControls.MENU.classList.remove("menu-shown");
  }

  resetHighscore() {
    this.game.resetHighscore();
    this.hideMenu();
  }
}
