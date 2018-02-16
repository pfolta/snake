const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('compile-sass', () => {
  return gulp.src(
      global.configuration.getProperty('paths.sources.stylesheets.directory') + '/' +
      global.configuration.getProperty('paths.sources.stylesheets.mainFile')
    )
    .pipe(sass.sync().on('error', (error) => {
      process.stderr.write(error.messageFormatted + '\n');
      process.exit(1);
    }))
    .pipe(gulp.dest(global.configuration.getProperty('paths.build.stylesheets')));
});
