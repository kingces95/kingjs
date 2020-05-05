var ExportExtension = require("@kingjs-module/export-extension")

var EmptyString = ''

function toUpperFirst(name) {
  if (!name)
    return EmptyString

  return name[0].toUpperCase() + name.substring(1)
}

/**
 * @description Capitalizes an array of strings and joins them together.
 * 
 * @this Array Array of names to join together into a camel case string.
 * @param [capitalize] True if the result should be capitalized.
 * 
 * @returns Returns a camel case string, optionally capitalized, or null.
 */
function join(capitalize) {
  if (this.length == 0)
    return null

  var result = this.map((x, i) => 
    i == 0 && !capitalize ?
    x : toUpperFirst(x)).join(EmptyString)

  return result
}

module[ExportExtension](Array, join)