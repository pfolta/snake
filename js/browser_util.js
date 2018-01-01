class BrowserUtil {
  static isAppleIOs() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  static isAppleIOsStandalone() {
    return BrowserUtil.isAppleIOs() && window.navigator.standalone;
  }
}
