'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var newChain = function(path) {
  if (path === void 0) {
    path = []
  }
  var chain = function() {}
  chain.path = path
  return chain
}
var pathToRequest = function(path, executeFields) {
  var _a
  if (path.length === 0) return undefined
  var _b = path[0],
    field = _b[0],
    arg = _b[1],
    rest = path.slice(1)
  var nextFields = pathToRequest(rest, executeFields) || executeFields
  return (
    (_a = {}),
    (_a[field] = arg
      ? nextFields && typeof nextFields !== 'boolean' && typeof nextFields !== 'number'
        ? [arg, nextFields]
        : [arg]
      : nextFields
      ? nextFields
      : 1),
    _a
  )
}
var wrapInProxy = function(chain, onExecute) {
  return new Proxy(chain, {
    get: function(target, prop) {
      if (typeof prop !== 'string') throw new Error('property is not a string')
      if (prop === 'execute') {
        return function(fields, defaultValue) {
          return onExecute(
            target.path.map(function(i) {
              return i[0]
            }),
            pathToRequest(target.path, fields),
            defaultValue,
          )
        }
      } else {
        var newPath = target.path.concat([[prop]])
        return wrapInProxy(newChain(newPath), onExecute)
      }
    },
    apply: function(target, _, argArray) {
      var newPath = target.path.slice(0, -1).concat([[target.path[target.path.length - 1][0], argArray[0]]])
      return wrapInProxy(newChain(newPath), onExecute)
    },
  })
}
exports.chain = function(onExecute) {
  return wrapInProxy(newChain(), onExecute)
}
//# sourceMappingURL=chain.js.map
