'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var listr_1 = __importDefault(require('listr'))
var clientTasks_1 = require('./clientTasks')
var schemaTask_1 = require('./schemaTask')
exports.task = function(config) {
  if (!config.output) throw new Error('`output` must be defined in the config')
  var output = config.output
  return {
    title: 'generating the client in `' + output + '`',
    task: function() {
      return new listr_1.default([schemaTask_1.schemaTask(config)].concat(clientTasks_1.clientTasks(config)))
    },
  }
}
//# sourceMappingURL=task.js.map
