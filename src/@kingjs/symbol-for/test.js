var assert = require('assert')
var symbolFor = require('@kingjs/symbol-for')

var At = '@'
var V = 'v'

var name = 'getValue'
var scope = 'acme-shipping'
var major = 1
var minor = 2
var patch = 3
var expected = Symbol.for(`${name}, ${At}${scope}, ${V}${major}.${minor}.${patch}`)
var actual = symbolFor(name, { scope, version: { major, minor, patch } })
assert.equal(actual, expected)

var name = 'IFoo'
var member = 'Foo'
var scope = 'acme-shipping'
var expected = Symbol.for(`${name}.${member}, ${At}${scope}`)
var actual = symbolFor(name, { scope, member })
assert.equal(actual, expected)