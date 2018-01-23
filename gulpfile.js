const gulp = require("gulp");

// Load gulp helpers.
const environmentHelper = require("./gulp/helpers/environment_helper");
const configurationHelper = require("./gulp/helpers/configuration_helper");

// Load gulp plugin tasks.
require("./gulp/tasks/plugins/compile-slm");
require("./gulp/tasks/plugins/lint-sass");
require("./gulp/tasks/plugins/compile-sass");
require("./gulp/tasks/plugins/autoprefix-css");
require("./gulp/tasks/plugins/minify-css");
require("./gulp/tasks/plugins/lint-js");
require("./gulp/tasks/plugins/transpile-js");
require("./gulp/tasks/plugins/minify-js");
require("./gulp/tasks/plugins/copy-assets.js");

// Load gulp tasks.
require("./gulp/tasks/clean");
require("./gulp/tasks/release");
require("./gulp/tasks/server");

// Set environment variable.
global.environment = environmentHelper.getEnvironment();

// Set configuration object.
configurationHelper.initialize(global.environment);
global.configuration = configurationHelper.getConfigurationObject();

// Register `gulp release` as the default task.
gulp.task("default", ["release"], () => {});
