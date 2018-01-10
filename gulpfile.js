const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-ruby-sass");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("clean", () => {
  return del.sync("dist");
});

gulp.task("sass", () => {
  return sass(
      "app/styles/application.scss",
      {
        emitCompileError: true,
        stopOnError: true
      })
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("autoprefix-css", () => {
  return gulp.src("dist/styles/*.css")
    .pipe(autoprefixer({
      browsers: "> 1%, last 2 versions, Firefox ESR"
    }))
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("default", () => console.log("default task"));
