'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var chalk_1 = __importDefault(require('chalk'))
exports.validateConfigs = function(configs) {
  var errors = []
  if (configs.length === 0) errors.push('config array is empty')
  configs.forEach(function(config, i) {
    var whichConfig = configs.length === 1 ? 'the config' : 'config #' + (i + 1)
    if (!config.endpoint && !config.schema && !config.fetcher)
      errors.push("you didn't provide either `endpoint`, `schema` or `fetcher` option in " + whichConfig)
    if (
      [config.endpoint, config.schema, config.fetcher].filter(function(i) {
        return i
      }).length > 1
    )
      errors.push(
        'you provided two or more conflicting options in ' +
          whichConfig +
          ', only one of either `endpoint`, `schema` or `fetcher` is allowed',
      )
    if (!config.output) errors.push("you didn't provide an `output` option in " + whichConfig)
  })
  errors.forEach(function(error) {
    return console.log(chalk_1.default.red('Error: ' + error))
  })
  return errors.length === 0
}
//# sourceMappingURL=validateConfigs.js.map
