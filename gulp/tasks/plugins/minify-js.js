const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('minify-js', () => {
  return gulp.src([
      global.configuration.getProperty('paths.build.scripts.directory') + '/' +
      global.configuration.getProperty('globs.allJsFiles'),

      '!' + global.configuration.getProperty('paths.build.scripts.directory') + '/' +
      global.configuration.getProperty('globs.allMinifiedJsFiles')
    ])
    .pipe(rename({
        suffix: global.configuration.getProperty('plugins.minify-js.suffix')
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(global.configuration.getProperty('paths.build.scripts.directory')));
});
