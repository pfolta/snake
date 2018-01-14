const gulp = require("gulp");
const runSequence = require("run-sequence");

const del = require("del");
const rename = require("gulp-rename");

const slm = require("gulp-slm");

const sasslint = require("gulp-sass-lint");
const sass = require("gulp-ruby-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");

const jshint = require("gulp-jshint");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");

// Load gulp helpers.
const environmentHelper = require("./gulp/helpers/environment_helper");
const configurationHelper = require("./gulp/helpers/configuration_helper");

// Set environment variable.
global.environment = environmentHelper.getEnvironment();

// Set configuration object.
configurationHelper.initialize(global.environment);
global.configuration = configurationHelper.getConfigurationObject();

gulp.task("clean", () => {
  return del.sync(["dist", ".sass-cache"]);
});

gulp.task("slm", () => {
  return gulp.src("src/app/views/*.slm")
    .pipe(slm({
      pretty: true
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("sasslint", () => {
  return gulp.src("src/app/styles/**/*.s+(a|c)ss")
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task("sass", () => {
  return sass(
      "src/app/styles/application.scss",
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

gulp.task("jshint", () => {
  return gulp.src("src/app/scripts/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task("transpile-js", () => {
  return browserify({
      entries: ["src/app/scripts/init.js"]
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

gulp.task("build", (callback) => {
  runSequence("clean", "slm", "sasslint", "sass", "autoprefix-css", "minify-css", "jshint", "transpile-js", "minify-js", callback);
});

gulp.task("default", ["build"], () => {});
