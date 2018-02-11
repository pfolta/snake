const fs = require("fs");
const yaml = require("js-yaml");
const log = require("gulplog");

module.exports = (function() {
  let _defaultConfig;
  let _environmentConfig;

  function _loadConfigurationFile(configurationFile) {
    log.info(`Loading configuration file '${configurationFile}'.`);
    return yaml.safeLoad(fs.readFileSync(configurationFile));
  }

  function _getPropertyFromConfig(property, config) {
    return property.split(".").reduce((section, key) => {
      return section ? section[key] : undefined;
    }, config);
  }

  function initialize(environment) {
    _defaultConfig = _loadConfigurationFile("configuration/default.yml");
    _environmentConfig = _loadConfigurationFile(`configuration/environments/${environment}.yml`);
  }

  function getProperty(propertyKey) {
    let environmentPropertyValue = _getPropertyFromConfig(propertyKey, _environmentConfig);
    let defaultPropertyValue = _getPropertyFromConfig(propertyKey, _defaultConfig);

    // An environment-specific property overrides the default property.
    let propertyValue = (environmentPropertyValue !== undefined) ? environmentPropertyValue : defaultPropertyValue;

    // This property is not defined in either the environment-specific or default configuration file.
    if (propertyValue === undefined) {
      throw new Error(`Property ${propertyKey} does not exist.`);
    }

    return propertyValue;
  }

  function getConfigurationObject() {
    return {
      getProperty: getProperty
    };
  }

  return {
    initialize: initialize,
    getConfigurationObject: getConfigurationObject
  };
})();
