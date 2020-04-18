var { 
  '@kingjs': {
    module: { ExportExtension },
    pojo: { ToPairs },
    array: { Expand }
  }
} = require('./dependencies')

/**
 * @description Expands the key/value pairs of the source 
 * joined by the separator and surrounded by the prefix and suffix.
 * 
 * @this any The object whose properties are expanded by the template.
 * 
 * @param template The template used to expand each key/value pair.
 * @param substitutions Substitutions in addition to the property key and value.
 * @param separator The separator to join each property key/value expansion.
 * 
 * @returns Returns the expansion.
 */
function expand(template, substitutions, separator) {
  return this[ToPairs]()
    [Expand](template, substitutions, separator)
}

module[ExportExtension](Object, expand)