const gulp = require("gulp");
const runSequence = require("run-sequence");

gulp.task("release", (callback) => {
  let pluginTasks = [];

  // Clean build directory
  if (global.configuration.getProperty("plugins.del.enabled")) {
    pluginTasks.push("del");
  }

  // Lint SASS source files.
  if (global.configuration.getProperty("plugins.gulp-sass-lint.enabled")) {
    pluginTasks.push("gulp-sass-lint");
  }

  // Compile SASS source files to CSS.
  if (global.configuration.getProperty("plugins.gulp-ruby-sass.enabled")) {
    pluginTasks.push("gulp-ruby-sass");
  }

  // Autoprefix compiled CSS.
  if (global.configuration.getProperty("plugins.gulp-autoprefixer.enabled")) {
    pluginTasks.push("gulp-autoprefixer");
  }

  // Minify compiled CSS.
  if (global.configuration.getProperty("plugins.gulp-cssnano.enabled")) {
    pluginTasks.push("gulp-cssnano");
  }

  pluginTasks.push(callback);
  runSequence.apply(null, pluginTasks);
});
