#!/usr/bin/env node
'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var commander_1 = __importDefault(require('commander'))
var listr_1 = __importDefault(require('listr'))
var chalk_1 = __importDefault(require('chalk'))
var task_1 = require('./cliHelpers/task')
var validateConfigs_1 = require('./cliHelpers/validateConfigs')
var files_1 = require('./helpers/files')
commander_1.default
  .option('-o, --output <./myClient>', 'output directory')
  .option('-e, --endpoint <http://example.com/graphql>', 'GraphQL endpoint')
  .option('-p, --post', 'use POST for introspection query')
  .option('-s, --schema <./mySchema.graphql>', 'path to GraphQL schema definition file')
  .option('-f, --fetcher <./schemaFetcher.js>', 'path to introspection query fetcher file')
  .option('-c, --config <./myConfig.js>', 'path to config file')
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv)
var resolveConfigs = function(configs) {
  return Array.isArray(configs) ? configs : [configs]
}
var configs = commander_1.default.config
  ? resolveConfigs(files_1.requireModuleFromPath([commander_1.default.config]))
  : [
      {
        endpoint: commander_1.default.endpoint,
        post: commander_1.default.post,
        schema: commander_1.default.schema,
        output: commander_1.default.output,
        fetcher: commander_1.default.fetcher,
      },
    ]
if (!validateConfigs_1.validateConfigs(configs)) commander_1.default.help()
new listr_1.default(
  configs.map(function(config) {
    return task_1.task(config)
  }),
  { renderer: commander_1.default.verbose ? 'verbose' : 'default' },
)
  .run()
  .catch(function(e) {
    console.log(chalk_1.default.red(e.stack))
    process.exit(1)
  })
//# sourceMappingURL=cli.js.map
