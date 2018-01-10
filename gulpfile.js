const gulp = require("gulp");
const sass = require("gulp-ruby-sass");

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
