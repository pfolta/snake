class UiHandler {
  constructor(game) {
    this.game = game;

    this.uiControls = {
      UI_CONTROLS_BAR: document.getElementById("js-ui-controls"),
      SCORE_LABEL: document.getElementById("js-score"),
      HIGHSCORE_LABEL: document.getElementById("js-highscore")
    }

    this.IOS_STATUS_BAR_CLASS = "ios-status-bar";

    if (BrowserUtil.isAppleIOsStandalone()) this.iOsStatusBarAdjustment();
  }

  iOsStatusBarAdjustment() {
    this.uiControls.UI_CONTROLS_BAR.classList.add(this.IOS_STATUS_BAR_CLASS);

    // Trigger canvas resize
    window.dispatchEvent(new Event('resize'));
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
}
