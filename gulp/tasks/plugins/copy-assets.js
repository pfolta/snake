const gulp = require("gulp");

gulp.task("copy-assets", () => {
  return gulp.src(
      global.configuration.getProperty("paths.sources.assets.directory") + "/" +
      global.configuration.getProperty("globs.allFiles")
    )
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.assets")));
});
