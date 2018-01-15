const gulp = require("gulp");
const runSequence = require("run-sequence");

gulp.task("release", (callback) => {
  let pluginTasks = [];

  // Compile SLM source files to HTML.
  if (global.configuration.getProperty("plugins.compile-slm.enabled")) {
    pluginTasks.push("compile-slm");
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

  // Transpile JS source files.
  if (global.configuration.getProperty("plugins.transpile-js.enabled")) {
    pluginTasks.push("transpile-js");
  }

  // Minify compiled JS.
  if (global.configuration.getProperty("plugins.minify-js.enabled")) {
    pluginTasks.push("minify-js");
  }

  pluginTasks.push(callback);
  runSequence.apply(null, pluginTasks);
});
