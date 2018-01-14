const gulp = require("gulp");
const runSequence = require("run-sequence");

gulp.task("release", (callback) => {
  let pluginTasks = [];

  // Clean build directory
  if (global.configuration.getProperty("plugins.clean.enabled")) {
    pluginTasks.push("clean");
  }

  // Lint SASS source files.
  if (global.configuration.getProperty("plugins.lint-sass.enabled")) {
    pluginTasks.push("lint-sass");
  }

  // Compile SASS source files to CSS.
  if (global.configuration.getProperty("plugins.compile-sass.enabled")) {
    pluginTasks.push("compile-sass");
  }

  // Autoprefix compiled CSS.
  if (global.configuration.getProperty("plugins.autoprefix-css.enabled")) {
    pluginTasks.push("autoprefix-css");
  }

  // Minify compiled CSS.
  if (global.configuration.getProperty("plugins.minify-css.enabled")) {
    pluginTasks.push("minify-css");
  }

  // Lint JS source files.
  if (global.configuration.getProperty("plugins.lint-js.enabled")) {
    pluginTasks.push("lint-js");
  }

  pluginTasks.push(callback);
  runSequence.apply(null, pluginTasks);
});
