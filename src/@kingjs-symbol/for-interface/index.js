var assert = require('assert')

var I = 'I'
var At = '@'

function forInterface(scope, package, name) {
  assert.ok(scope[0].toUpperCase(), At)
  assert.ok(package[0].toUpperCase(), I)
  assert.ok(package[1].toUpperCase(), package[1])
  assert.ok(name[0].toLowerCase(), name[0])

  return Symbol.for(`${package}.${name}, ${scope}`)
}

module.exports = forInterface