var assert = require('assert')
var EmptyObject = require('@kingjs/empty-object')

var EmptyString = ''
var At = '@'
var V = 'v'
var Period = '.'
var Comma = ','
var Space = ' '

var Name = 'for'
var Options = { 
  scope: 'kingjs',
  version: { major: 1, minor: 0, patch: 0 }
}

/**
 * @description Get the symbol with a structured key name.
 * @param name The camel case join of the package name split by dash.
 * @param [options] A pojo of the form { version: { major, minor, patch }, member, scope }
 * @returns Returns a published symbol with a structured name 
 * ala 'name[.member], @scope[, vMajor.Minor.Patch]'
 */
function symbolFor(name, options = EmptyObject) {
  var { version, member, scope } = options

  var parts = [ name ]
  if (member) {
    parts.push(Period)
    parts.push(member)
  }

  if (scope) {
    assert.notEqual(scope[0], At)
    parts.push(Comma)
    parts.push(Space)
    parts.push(At)
    parts.push(scope)
  }
  
  if (version) {
    parts.push(Comma)
    parts.push(Space)
    parts.push(V)

    var { major = 0, minor = 0, patch = 0 } = version
    parts.push(major)
    parts.push(Period)
    parts.push(minor)
    parts.push(Period)
    parts.push(patch)
  }

  var key = parts.join(EmptyString)
  return Symbol.for(key)
}

var symbol = symbolFor(Name, Options)
Symbol[symbol] = symbolFor
module.exports = symbol

/**
 * @description Generate the symbol from metadata found in a package which
 * will be used as the key to publish an extension member. 
 * @param {Package} package The package.
 * @returns Returns a published symbol derived from metadata in `package`.
 */
// function forFromPackage(package) {
//   var { camelCaseName: name, scope, major, minor, patch } = package
//   return symbolFor(name, scope, major, minor, patch)
//}