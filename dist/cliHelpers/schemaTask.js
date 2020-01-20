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
var _this = this
Object.defineProperty(exports, '__esModule', { value: true })
var graphql_1 = require('graphql')
var files_1 = require('../helpers/files')
var fetchSchema_1 = require('../schema/fetchSchema')
var graphql_toolkit_1 = require('graphql-toolkit')
exports.schemaTask = function(config) {
  if (config.endpoint) {
    var endpoint_1 = config.endpoint
    return {
      title: 'fetching schema using ' + (config.post ? 'POST' : 'GET') + ' ' + endpoint_1,
      task: function(ctx) {
        return __awaiter(_this, void 0, void 0, function() {
          var _a
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _a = ctx
                return [4 /*yield*/, fetchSchema_1.fetchSchema(endpoint_1, config.post)]
              case 1:
                _a.schema = _b.sent()
                return [2 /*return*/]
            }
          })
        })
      },
    }
  } else if (config.fetcher) {
    var fetcher_1 = config.fetcher
    return {
      title: 'fetching schema using custom fetcher',
      task: function(ctx) {
        return __awaiter(_this, void 0, void 0, function() {
          var resolvedFetcher, _a
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                resolvedFetcher = typeof fetcher_1 === 'string' ? files_1.requireModuleFromPath([fetcher_1]) : fetcher_1
                _a = ctx
                return [
                  4 /*yield*/,
                  fetchSchema_1.customFetchSchema(resolvedFetcher, config.options && config.options.schemaValidation),
                ]
              case 1:
                _a.schema = _b.sent()
                return [2 /*return*/]
            }
          })
        })
      },
    }
  } else if (config.schema) {
    var schema_1 = config.schema
    return {
      title: 'loading schema',
      task: function(ctx) {
        return __awaiter(_this, void 0, void 0, function() {
          var options, document
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                options = config.options && config.options.schemaBuild
                return [4 /*yield*/, graphql_toolkit_1.loadSchema(schema_1)]
              case 1:
                document = _a.sent()
                ctx.schema =
                  document instanceof graphql_1.GraphQLSchema ? document : graphql_1.buildASTSchema(document, options)
                try {
                  graphql_1.assertValidSchema(ctx.schema)
                } catch (e) {
                  if (e.message === 'Query root type must be provided.') return [2 /*return*/]
                  throw e
                }
                return [2 /*return*/]
            }
          })
        })
      },
    }
  } else {
    throw new Error('either `endpoint`, `fetcher` or `schema` must be defined in the config')
  }
}
//# sourceMappingURL=schemaTask.js.map
