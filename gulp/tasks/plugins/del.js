const gulp = require("gulp");
const del = require("del");

gulp.task("del", () => {
  return del.sync(global.configuration.getProperty("plugins.del.directories"));
});
