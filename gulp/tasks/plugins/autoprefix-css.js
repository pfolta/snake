const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefix-css', () => {
  return gulp.src(
      global.configuration.getProperty('paths.build.stylesheets') + '/' +
      global.configuration.getProperty('globs.allCssFiles')
    )
    .pipe(autoprefixer({
      browsers: global.configuration.getProperty('plugins.autoprefix-css.browsers')
    }))
    .pipe(gulp.dest(global.configuration.getProperty('paths.build.stylesheets')));
});
