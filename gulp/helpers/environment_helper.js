const log = require('gulplog');

const ENVIRONMENT_ARGUMENT_MARKER = '--env=';
const DEFAULT_ENVIRONMENT = 'production';

module.exports = {
  getEnvironment: () => {
    for (let arg of process.argv) {
      arg = arg.toLowerCase();

      if (arg.startsWith(ENVIRONMENT_ARGUMENT_MARKER)) {
        let environment = arg.substring(ENVIRONMENT_ARGUMENT_MARKER.length);

        log.info(`Overriding environment to '${environment}'.`);
        return environment;
      }
    }

    log.info(`No environment override specified, using '${DEFAULT_ENVIRONMENT}'.`);
    return DEFAULT_ENVIRONMENT;
  }
};
