var {
  ['@kingjs']: { 
    module: { ExportExtension },
    stringEx: { Expand }
  }
} = require('./dependencies')

var EmptyString = ''
var EmptyObject = { }

/**
 * @description Joins the expansions of `template` for each key/value pair of `source`
 * with optional `separator`, `prefix`, and `suffix` while also introducing loop
 * iteration variable `i`.
 * 
 * @this any The template to expand for each key/value pair.
 * 
 * @param source The list of key/value pairs.
 * @param [substitutions] The substitutions to be passed during expansion
 * @param [separator] The separator used to join the template expansions
 * @param [prefix] A prefix for the result string
 * @param [suffix] A suffix for the result string
 * 
 * @remarks - During template expansion, all key/value paris of substitutions
 * are made available as well as a loop iteration variable `i`. 
 * @remarks - The `prefix` and `suffix` are only added if there is at least
 * one key/value pair. If there are no key/value pairs, the empty string is returned.
 */
function expandForEach(
  source, 
  substitutions = EmptyObject, 
  separator = EmptyString, 
  prefix = EmptyString, 
  suffix = EmptyString) {

  if (!source)
    return EmptyString

  var keys = Object.keys(source)
  if (!keys.length)
    return EmptyString

  var expansions = []
  var i = 0
  for (var key of keys) {
    var expansion = this[Expand]({ 
      ...substitutions, i: i++, key, value: source[key] 
    })
    expansions.push(expansion)
  }

  return `${prefix}${expansions.join(separator)}${suffix}`
}

module[ExportExtension](String, expandForEach)