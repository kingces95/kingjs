var assert = require('assert')

var EmptyObject = { }
var EmptyString = ''
var At = '@'
var V = 'v'
var Period = '.'
var Comma = ','
var Space = ' '

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

module.exports = symbolFor