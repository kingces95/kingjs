var assert = require('assert')
var Split = require('@kingjs-camel-case/split')
var Join = require('@kingjs-camel-case/join')

var apart = 'fooBar'[Split]()
var together = apart[Join]()
assert.equal('fooBar', together)

var apart = 'FooBar'[Split]()
var together = apart[Join]()
assert.equal('fooBar', together)

var together = apart[Join]({ capitalize: true })
assert.equal('FooBar', together)

var apart = 'FBar'[Split]()
var together = apart[Join]()
assert.equal('fBar', together)

assert.equal(null, [][Join]())
assert.equal('', [''][Join]())
assert.equal('', ['', ''][Join]())