const gulp = require("gulp");

const rename = require("gulp-rename");

const slm = require("gulp-slm");

const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");

// Load gulp helpers.
const environmentHelper = require("./gulp/helpers/environment_helper");
const configurationHelper = require("./gulp/helpers/configuration_helper");

// Load gulp plugin tasks.
require("./gulp/tasks/plugins/lint-sass");
require("./gulp/tasks/plugins/compile-sass");
require("./gulp/tasks/plugins/autoprefix-css");
require("./gulp/tasks/plugins/minify-css");
require("./gulp/tasks/plugins/lint-js");

// Load gulp tasks.
require("./gulp/tasks/clean");
require("./gulp/tasks/release");
require("./gulp/tasks/server");

// Set environment variable.
global.environment = environmentHelper.getEnvironment();

// Set configuration object.
configurationHelper.initialize(global.environment);
global.configuration = configurationHelper.getConfigurationObject();

gulp.task("slm", () => {
  return gulp.src("src/app/views/*.slm")
    .pipe(slm({
      pretty: true
    }))
    .pipe(gulp.dest("dist"));
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

// Register `gulp release` as the default task.
gulp.task("default", ["release"], () => {});
