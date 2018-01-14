const gulp = require("gulp");
const log = require("gulplog");

gulp.task("release", () => {
  log.info("TODO: Implement `gulp release`.");

  log.info(global.configuration.getProperty("source.stylesheets"));
  log.info(global.configuration.getProperty("javascripts.minify"));
});
