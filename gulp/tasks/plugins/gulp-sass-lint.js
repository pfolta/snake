const gulp = require("gulp");
const sassLint = require("gulp-sass-lint");

gulp.task("gulp-sass-lint", () => {
  let stream = gulp.src(global.configuration.getProperty("paths.sources.stylesheets.allFiles"))
    .pipe(sassLint({
      configFile: global.configuration.getProperty("plugins.gulp-sass-lint.configFile")
    }))
    .pipe(sassLint.format());

  if (global.configuration.getProperty("plugins.gulp-sass-lint.failOnError")) {
    stream.pipe(sassLint.failOnError());
  }

  return stream;
});
