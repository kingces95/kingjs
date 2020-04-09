var { 
  ['@kingjs']: { 
    defineExtension,
  }
} = require('./dependencies')

var { name, version } = require('./package.json');

/**
 * @description Maps each value of a pojo.
 * 
 * @this any The pojo whose values are mapped.
 * @param callback The mapping function.
 * 
 * @callback
 * @param value The value to map.
 * @param key The key of the value.
 * @returns The mapped value.
 * 
 * @returns Returns a new pojo with mapped values.
 */
function map(callback = o => o) {
  var pojo = this
  var result = { }

  for (var key in pojo) 
    result[key] = callback(pojo[key], key)

  return result;
}

module.exports = defineExtension(
  Object.prototype, name, version, map
);