const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('transpile-js', () => {
  return browserify({
      entries: [
        global.configuration.getProperty('paths.sources.scripts.directory') + '/' +
        global.configuration.getProperty('paths.sources.scripts.mainFile')
      ]
    })
    .transform(babelify)
    .bundle()
    .pipe(source(global.configuration.getProperty('paths.build.scripts.outputFile')))
    .pipe(gulp.dest(global.configuration.getProperty('paths.build.scripts.directory')));
});
