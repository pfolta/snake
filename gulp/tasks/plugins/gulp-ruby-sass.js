const gulp = require("gulp");
const sass = require("gulp-ruby-sass");

gulp.task("gulp-ruby-sass", () => {
  return sass(
      global.configuration.getProperty("paths.sources.stylesheets.mainSassFile"),
      {
        cacheLocation: global.configuration.getProperty("plugins.gulp-ruby-sass.cacheLocation"),
        emitCompileError: global.configuration.getProperty("plugins.gulp-ruby-sass.emitCompileError"),
        stopOnError: global.configuration.getProperty("plugins.gulp-ruby-sass.stopOnError")
      })
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.stylesheets")));
});
