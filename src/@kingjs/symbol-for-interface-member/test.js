var assert = require('assert')
var getSymbolForInterfaceMember = require('@kingjs/get-symbol-for-interface-member')

var At = '@'

var name = 'IFoo'
var member = 'Foo'
var scope = 'acme-shipping'

var expected = Symbol.for(`${name}.${member}, ${At}${scope}`)
var actual = getSymbolForInterfaceMember(name, member, scope)

assert.equal(actual, expected)