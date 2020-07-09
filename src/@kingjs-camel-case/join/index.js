var For = require('@kingjs-symbol/for')

var EmptyString = ''
var EmptyObject = { }

var Name = 'join'
var Scope = 'kingjs-camel-case'
var Version = { major: 1, minor: 0, patch: 0 }

var Join = Symbol[For](Name, { 
  scope: Scope,
  version: Version
})

function toUpperFirst(name) {
  if (!name)
    return EmptyString

  return name[0].toUpperCase() + name.substring(1)
}

/**
 * @description Capitalizes an array of strings and joins them together.
 * 
 * @this Array Array of names to join together into a camel case string.
 * @param [options] Options of the form { capitalize } where if capitalize is
 * true, then then the result is capitalized.
 * 
 * @returns Returns a camel case string, optionally capitalized, or null.
 */
function join(options = EmptyObject) {
  var { capitalize } = options
  if (this.length == 0)
    return null

  var result = this.map((x, i) => 
    i == 0 && !capitalize ?
    x : toUpperFirst(x)).join(EmptyString)

  return result
}

Array.prototype[Join] = join
module.exports = Join