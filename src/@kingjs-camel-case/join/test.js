var { assert,
  '@kingjs': {
    '-camel-case': { Split, Join },
  }
} = module[require('@kingjs-module/dependencies')]()

var apart = 'fooBar'[Split]()
var together = apart[Join]()
assert.equal('fooBar', together)

var apart = 'FooBar'[Split]()
var together = apart[Join]()
assert.equal('fooBar', together)

var together = apart[Join](true)
assert.equal('FooBar', together)

var apart = 'FBar'[Split]()
var together = apart[Join]()
assert.equal('fBar', together)

assert.equal(null, [][Join]())
assert.equal('', [''][Join]())
assert.equal('', ['', ''][Join]())