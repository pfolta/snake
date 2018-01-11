const gulp = require("gulp");
const del = require("del");
const rename = require("gulp-rename");
const sass = require("gulp-ruby-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");

const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");

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
      })
    )
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("minify-css", () => {
  return gulp.src(["dist/styles/*.css", "!dist/styles/*.min.css"])
    .pipe(rename({
        suffix: ".min"
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("transpile-js", () => {
  return browserify({
      entries: ["app/scripts/init.js"]
    })
    .transform(babelify)
    .bundle()
    .pipe(source("application.js"))
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("minify-js", () => {
  return gulp.src(["dist/scripts/*.js", "!dist/scripts/*.min.js"])
    .pipe(rename({
        suffix: ".min"
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("default", () => console.log("default task"));
