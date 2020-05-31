var { assert,
  '@kingjs': {
    '-string': { Intern }
  }
} = module[require('@kingjs-module/dependencies')]()

var foo = 'foo'[Intern]()
assert.equal(foo.toString(), 'foo')
assert.equal(foo, 'foo'[Intern]())