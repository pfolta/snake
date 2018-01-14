const gulp = require("gulp");
const sass = require("gulp-ruby-sass");

gulp.task("gulp-ruby-sass", () => {
  return sass(
      global.configuration.getProperty("paths.sources.stylesheets.mainSassFile"),
      {
        emitCompileError: global.configuration.getProperty("plugins.gulp-ruby-sass.emitCompileError"),
        stopOnError: global.configuration.getProperty("plugins.gulp-ruby-sass.stopOnError")
      })
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.stylesheets")));
});
