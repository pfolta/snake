const gulp = require('gulp');
const istanbul = require('gulp-babel-istanbul');
const babel = require('gulp-babel');
const injectModules = require('gulp-inject-modules');
const mocha = require('gulp-mocha');

gulp.task('pre-test-js', () => {
  return gulp.src(
      global.configuration.getProperty('paths.sources.scripts.directory') + '/' +
      global.configuration.getProperty('globs.allJsFiles')
    )
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test-js', ['pre-test-js'], () => {
  return gulp.src(
      global.configuration.getProperty('paths.tests.directory') + '/' +
      global.configuration.getProperty('globs.allJsTestFiles')
    )
    .pipe(babel())
    .pipe(injectModules())
    .pipe(mocha())
    .on('error', process.exit.bind(process, 1))
    .pipe(istanbul.writeReports({
      dir: global.configuration.getProperty('plugins.test-js.reportDir'),
      reporters: global.configuration.getProperty('plugins.test-js.reporters')
    }));
});
