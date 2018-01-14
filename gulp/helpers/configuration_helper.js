const fs = require("fs");
const yaml = require("js-yaml");
const log = require("gulplog");

module.exports = (() => {
  let _defaultConfig;
  let _environmentConfig;

  function loadConfigurationFile(configurationFile) {
    log.info(`Loading configuration file '${configurationFile}'.`);
    return yaml.safeLoad(fs.readFileSync(configurationFile));
  }

  function getPropertyFromConfig(property, config) {
    return property.split(".").reduce((section, key) => {
      return section ? section[key] : undefined;
    }, config);
  }

  let initialize = (environment) => {
    _defaultConfig = loadConfigurationFile("configuration/default.yml");
    _environmentConfig = loadConfigurationFile(`configuration/environments/${environment}.yml`);
  };

  let getProperty = (propertyKey) => {
    let environmentPropertyValue = getPropertyFromConfig(propertyKey, _environmentConfig);
    let defaultPropertyValue = getPropertyFromConfig(propertyKey, _defaultConfig);

    // An environment-specific property overrides the default property.
    let propertyValue = (environmentPropertyValue !== undefined) ? environmentPropertyValue : defaultPropertyValue;

    // This property is not defined in either the environment-specific or default configuration file.
    if (propertyValue === undefined) {
      throw new Error(`Property ${propertyKey} does not exist.`);
    }

    return propertyValue;
  };

  let getConfigurationObject = () => {
    return {
      getProperty: getProperty
    };
  };

  return {
    initialize: initialize,
    getConfigurationObject: getConfigurationObject
  };
})();
