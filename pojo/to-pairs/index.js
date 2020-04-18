var { 
  assert,
  '@kingjs': {
    module: { ExportExtension }
  }
} = require('./dependencies')

/**
 * @description Returns an array of objects with key and value properties
 * for the name and value of each property of the source object.
 * 
 * @this any The object whose properties are returned as an array of pairs
 * 
 * @returns Returns an array of `{ key, value }`.
 */
function toPairs() {
  var result = []

  for (var key in this)
    result.push({ key, value: this[key] })

  return result
}

module[ExportExtension](Object, toPairs)