const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('test', (callback) => {
  let pluginTasks = global.configuration.getProperty('tasks.test');

  pluginTasks.push(callback);
  runSequence.apply(null, pluginTasks);
});
