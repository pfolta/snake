export default class StorageHandler {
  constructor() {
    this.KEY_PREFIX = "snake";
    this.KEY_SEPARATOR = "###";
  }

  get(key, defaultValue) {
    return window.localStorage.getItem(this.KEY_PREFIX + this.KEY_SEPARATOR + key) || defaultValue;
  }

  set(key, value) {
    window.localStorage.setItem(this.KEY_PREFIX + this.KEY_SEPARATOR + key, value);
  }
}
