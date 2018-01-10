const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-ruby-sass");

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

gulp.task("default", () => console.log("default task"));
