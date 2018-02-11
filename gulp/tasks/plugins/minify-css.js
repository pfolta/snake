const gulp = require("gulp");
const rename = require("gulp-rename");
const cssnano = require("gulp-cssnano");

gulp.task("minify-css", () => {
  return gulp.src([
      global.configuration.getProperty("paths.build.stylesheets") + "/" +
      global.configuration.getProperty("globs.allCssFiles"),

      "!" + global.configuration.getProperty("paths.build.stylesheets") + "/" +
      global.configuration.getProperty("globs.allMinifiedCssFiles")
    ])
    .pipe(rename({
      suffix: global.configuration.getProperty("plugins.minify-css.suffix")
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.stylesheets")));
});
