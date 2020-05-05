var { 
  '@kingjs-module': { 
    ExportExtension
  }
} = module[require('@kingjs-module/dependencies')]()

var Space = ' '
var Regex = /[\r\n\x0B\x0C\u0085\u2028\u2029]+/g

/**
 * @description Join lines in a string with a separator.
 * 
 * @this any The string of newlines to join.
 * @param [separator=' '] The separator to join the newlines with.
 * 
 * @returns Returns the string with newlines replaced with the separator.
 * 
 * @remarks Adjacent empty lines are replaced with a single separator.
 */
function joinLines(separator) {
  if (!separator)
    separator = Space

  var result = this
  result = result.replace(Regex, separator)
  return result
}

module[ExportExtension](String, joinLines)