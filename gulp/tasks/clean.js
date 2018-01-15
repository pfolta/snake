const gulp = require("gulp");
const del = require("del");

gulp.task("clean", () => {
  return del.sync(global.configuration.getProperty("paths.build.targetDirectory"));
});
