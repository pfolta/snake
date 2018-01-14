const gulp = require("gulp");
const sassLint = require("gulp-sass-lint");

gulp.task("lint-sass", () => {
  let stream = gulp.src(global.configuration.getProperty("paths.sources.stylesheets.allFiles"))
    .pipe(sassLint({
      configFile: global.configuration.getProperty("plugins.lint-sass.configFile")
    }))
    .pipe(sassLint.format());

  if (global.configuration.getProperty("plugins.lint-sass.failOnError")) {
    stream.pipe(sassLint.failOnError());
  }

  return stream;
});
