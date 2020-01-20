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
var renderTypeMap_1 = require('../render/typeMap/renderTypeMap')
var render_1 = require('../testHelpers/render')
var linkTypeMap_1 = require('./linkTypeMap')
var applyTypeMapperToVariable_1 = require('./applyTypeMapperToVariable')
var getRoot = function() {
  return __awaiter(_this, void 0, void 0, function() {
    var result, typeMap
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            render_1.schemaRenderTest(
              /* GraphQL */ '\n      scalar Date\n\n      input Nested {\n        scalar: Date\n      }\n\n      input Object {\n        unrelated: Int!\n        nullable: Int\n        scalar: Date!\n        nested: Nested!\n      }\n\n      type Query {\n        field(scalar: Date!, object: Object!, list: [Object!]!): Boolean!\n      }\n    ',
              renderTypeMap_1.renderTypeMap,
            ),
          ]
        case 1:
          result = _a.sent()
          typeMap = linkTypeMap_1.linkTypeMap(JSON.parse(result))
          if (!typeMap.Query) throw new Error('query type is missing')
          return [2 /*return*/, typeMap.Query]
      }
    })
  })
}
describe('applyTypeMapperToVariable', function() {
  test('passes unchanged values  when type mapper is not provided', function() {
    return __awaiter(_this, void 0, void 0, function() {
      var root, date
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, getRoot()]
          case 1:
            root = _a.sent()
            date = new Date()
            expect(applyTypeMapperToVariable_1.applyTypeMapperToVariable(date, root.fields.field.args.scalar[1])).toBe(date)
            expect(
              applyTypeMapperToVariable_1.applyTypeMapperToVariable(
                { unrelated: 3, nullable: null, scalar: date, nested: { scalar: date } },
                root.fields.field.args.object[1],
              ),
            ).toEqual({ unrelated: 3, nullable: null, scalar: date, nested: { scalar: date } })
            expect(
              applyTypeMapperToVariable_1.applyTypeMapperToVariable(
                [{ scalar: date, nested: { scalar: date } }, { scalar: date }],
                root.fields.field.args.list[1],
              ),
            ).toEqual([{ scalar: date, nested: { scalar: date } }, { scalar: date }])
            return [2 /*return*/]
        }
      })
    })
  })
  test('passes serialized values when type mapper is provided', function() {
    return __awaiter(_this, void 0, void 0, function() {
      var root, date, dateString, typeMapper
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, getRoot()]
          case 1:
            root = _a.sent()
            date = new Date()
            dateString = date.toISOString()
            typeMapper = {
              Date: {
                serialize: function(d) {
                  return d.toISOString()
                },
                deserialize: function(d) {
                  return new Date(d)
                },
              },
            }
            expect(
              applyTypeMapperToVariable_1.applyTypeMapperToVariable(date, root.fields.field.args.scalar[1], typeMapper),
            ).toBe(dateString)
            expect(
              applyTypeMapperToVariable_1.applyTypeMapperToVariable(
                { unrelated: 3, nullable: null, scalar: date, nested: { scalar: date } },
                root.fields.field.args.object[1],
                typeMapper,
              ),
            ).toEqual({ unrelated: 3, nullable: null, scalar: dateString, nested: { scalar: dateString } })
            expect(
              applyTypeMapperToVariable_1.applyTypeMapperToVariable(
                [{ scalar: date, nested: { scalar: date } }, { unrelated: 3, nullable: null, scalar: date }],
                root.fields.field.args.list[1],
                typeMapper,
              ),
            ).toEqual([
              { scalar: dateString, nested: { scalar: dateString } },
              { unrelated: 3, nullable: null, scalar: dateString },
            ])
            return [2 /*return*/]
        }
      })
    })
  })
})
//# sourceMappingURL=applyTypeMapperToVariable.test.js.map
