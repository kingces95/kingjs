var { assert,
  '@kingjs': {
    '-camel-case': { Split },
  }
} = module[require('@kingjs-module/dependencies')]()

var apart = 'fooBar'[Split]()
assert.equal(apart.length, 2)
assert.equal(apart[0], 'foo')
assert.equal(apart[1], 'bar')

var apart = 'FooBar'[Split]()
assert.equal(apart.length, 2)
assert.equal(apart[0], 'foo')
assert.equal(apart[1],'bar')

var apart = 'FBar'[Split]()
assert.equal(apart.length, 2)
assert.equal(apart[0], 'f')
assert.equal(apart[1], 'bar')

var apart = ''[Split]()
assert.equal(apart.length, 1)
assert.equal(apart[0], '')