'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var getFieldFromPath_1 = require('./getFieldFromPath')
var applyRecursively = function(root, data, typeMapper, path) {
  if (data === null || data === undefined) return data
  else {
    var field = path.length > 0 ? getFieldFromPath_1.getFieldFromPath(root, path) : undefined
    var specificMapper = field ? typeMapper[field.type.name] : undefined
    if (specificMapper !== undefined) return specificMapper.serialize(data)
    else if (Array.isArray(data))
      return data.map(function(i) {
        return applyRecursively(root, i, typeMapper, path)
      })
    else if (typeof data === 'object')
      return Object.keys(data).reduce(function(r, k) {
        r[k] = applyRecursively(root, data[k], typeMapper, path.concat([k]))
        return r
      }, {})
    else return data
  }
}
exports.applyTypeMapperToVariable = function(value, root, typeMapper) {
  if (!typeMapper) return value
  var specificMapper = typeMapper[root.name]
  if (specificMapper !== undefined) return specificMapper.serialize(value)
  return applyRecursively(root, value, typeMapper, [])
}
//# sourceMappingURL=applyTypeMapperToVariable.js.map
