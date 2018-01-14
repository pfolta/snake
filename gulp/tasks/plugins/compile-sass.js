const gulp = require("gulp");
const sass = require("gulp-ruby-sass");

gulp.task("compile-sass", () => {
  return sass(
      global.configuration.getProperty("paths.sources.stylesheets.mainSassFile"),
      {
        cacheLocation: global.configuration.getProperty("plugins.compile-sass.cacheLocation"),
        emitCompileError: global.configuration.getProperty("plugins.compile-sass.emitCompileError"),
        stopOnError: global.configuration.getProperty("plugins.compile-sass.stopOnError")
      })
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.stylesheets")));
});
