const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("gulp-autoprefixer", () => {
  return gulp.src(`${global.configuration.getProperty("paths.build.stylesheets")}/${global.configuration.getProperty("globs.allCssFiles")}`)
    .pipe(autoprefixer({
      browsers: global.configuration.getProperty("plugins.gulp-autoprefixer.browsers")
    }))
    .pipe(gulp.dest(global.configuration.getProperty("paths.build.stylesheets")));
});
