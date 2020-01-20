'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
var _this = this
Object.defineProperty(exports, '__esModule', { value: true })
var listr_1 = __importDefault(require('listr'))
var files_1 = require('../helpers/files')
var renderChainTypes_1 = require('../render/chain/renderChainTypes')
var renderClient_1 = require('../render/client/renderClient')
var renderClientDefinition_1 = require('../render/client/renderClientDefinition')
var RenderContext_1 = require('../render/common/RenderContext')
var renderRequestTypes_1 = require('../render/requestTypes/renderRequestTypes')
var renderResponseTypes_1 = require('../render/responseTypes/renderResponseTypes')
var renderSchema_1 = require('../render/schema/renderSchema')
var renderTypeGuards_1 = require('../render/typeGuards/renderTypeGuards')
var renderTypeMap_1 = require('../render/typeMap/renderTypeMap')
var schemaGqlFile = 'schema.graphql'
var schemaTypesFile = 'schema.ts'
var typeMapFile = 'typeMap.json'
var clientFile = 'createClient.js'
var clientTypesFile = 'createClient.d.ts'
exports.clientTasks = function(config) {
  if (!config.output) throw new Error('`output` must be defined in the config')
  var output = config.output
  return [
    {
      title: 'preparing client directory',
      task: function() {
        return files_1.ensurePath([output], true)
      },
    },
    {
      title: 'writing files',
      task: function() {
        return new listr_1.default(
          [
            {
              title: 'writing ' + schemaGqlFile,
              task: function(ctx) {
                return __awaiter(_this, void 0, void 0, function() {
                  var renderCtx
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        renderCtx = new RenderContext_1.RenderContext(ctx.schema, config)
                        renderSchema_1.renderSchema(ctx.schema, renderCtx)
                        return [4 /*yield*/, files_1.writeFileToPath([output, schemaGqlFile], renderCtx.toCode('graphql'))]
                      case 1:
                        _a.sent()
                        return [2 /*return*/]
                    }
                  })
                })
              },
            },
            {
              title: 'writing ' + schemaTypesFile,
              task: function(ctx) {
                return __awaiter(_this, void 0, void 0, function() {
                  var renderCtx
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        renderCtx = new RenderContext_1.RenderContext(ctx.schema, config)
                        renderResponseTypes_1.renderResponseTypes(ctx.schema, renderCtx)
                        renderRequestTypes_1.renderRequestTypes(ctx.schema, renderCtx)
                        renderTypeGuards_1.renderTypeGuards(ctx.schema, renderCtx)
                        renderChainTypes_1.renderChainTypes(ctx.schema, renderCtx)
                        return [
                          4 /*yield*/,
                          files_1.writeFileToPath([output, schemaTypesFile], renderCtx.toCode('typescript')),
                        ]
                      case 1:
                        _a.sent()
                        return [2 /*return*/]
                    }
                  })
                })
              },
            },
            {
              title: 'writing ' + typeMapFile,
              task: function(ctx) {
                return __awaiter(_this, void 0, void 0, function() {
                  var renderCtx
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        renderCtx = new RenderContext_1.RenderContext(ctx.schema, config)
                        renderTypeMap_1.renderTypeMap(ctx.schema, renderCtx)
                        return [4 /*yield*/, files_1.writeFileToPath([output, typeMapFile], renderCtx.toCode())]
                      case 1:
                        _a.sent()
                        return [2 /*return*/]
                    }
                  })
                })
              },
            },
            {
              title: 'writing ' + clientFile,
              task: function(ctx) {
                return __awaiter(_this, void 0, void 0, function() {
                  var renderCtx
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        renderCtx = new RenderContext_1.RenderContext(ctx.schema, config)
                        renderClient_1.renderClient(ctx.schema, renderCtx)
                        return [4 /*yield*/, files_1.writeFileToPath([output, clientFile], renderCtx.toCode('babel'))]
                      case 1:
                        _a.sent()
                        return [2 /*return*/]
                    }
                  })
                })
              },
            },
            {
              title: 'writing ' + clientTypesFile,
              task: function(ctx) {
                return __awaiter(_this, void 0, void 0, function() {
                  var renderCtx
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        renderCtx = new RenderContext_1.RenderContext(ctx.schema, config)
                        renderClientDefinition_1.renderClientDefinition(ctx.schema, renderCtx)
                        return [
                          4 /*yield*/,
                          files_1.writeFileToPath([output, clientTypesFile], renderCtx.toCode('typescript')),
                        ]
                      case 1:
                        _a.sent()
                        return [2 /*return*/]
                    }
                  })
                })
              },
            },
          ],
          { concurrent: true },
        )
      },
    },
  ]
}
//# sourceMappingURL=clientTasks.js.map
