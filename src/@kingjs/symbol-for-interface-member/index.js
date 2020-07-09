var assert = require('assert')

var I = 'I'
var At = '@'

/**
 * @description Get the symbol for an interface member.
 * @param name The camel case name of the interface.
 * @param member The camel case name of the member.
 * @param scope The package scope (without `@` but otherwise unchanged).
 * 
 * @remarks The interface name must begin with `I`.
 * @remarks The member name must not be capitalized.
 */
function getSymbolForInterfaceMember(name, member, scope) {
  
  // interface starts with 'I'
  assert.ok(name[0].toUpperCase(), I)

  // interface name after 'I' is capitalized; e.g. the 'E' in IEnumerable
  assert.ok(name[1].toUpperCase(), name[1])

  // interface members are not capitalized
  assert.ok(member[0].toLowerCase(), member[0])

  return Symbol.for(`${name}.${member}, ${At}${scope}`)
}

module.exports = getSymbolForInterfaceMember