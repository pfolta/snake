const gulp = require("gulp");
const jsHint = require("gulp-jshint");

gulp.task("lint-js", () => {
  let stream = gulp.src(`${global.configuration.getProperty("paths.sources.scripts")}/${global.configuration.getProperty("globs.allJsFiles")}`)
    .pipe(jsHint(global.configuration.getProperty("plugins.lint-js.configFile")))
    .pipe(jsHint.reporter(global.configuration.getProperty("plugins.lint-js.reporter")));

  if (global.configuration.getProperty("plugins.lint-js.failOnError")) {
    stream.pipe(jsHint.reporter('fail'));
  }

  return stream;
});
