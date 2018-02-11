const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('release', (callback) => {
  let pluginTasks = global.configuration.getProperty('tasks.release');

  pluginTasks.push(callback);
  runSequence.apply(null, pluginTasks);
});
