const gulp = require("gulp");
const slm = require("gulp-slm");

gulp.task("compile-slm", () => {
  return gulp.src(
      global.configuration.getProperty("paths.sources.views.directory") + "/" +
      global.configuration.getProperty("paths.sources.views.mainFile")
    )
    .pipe(slm())
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.views")));
});
