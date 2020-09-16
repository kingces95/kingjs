var { assert,
  '@kingjs': { 
    '-array': { ToFlags }
  }
} = module[require('@kingjs-module/dependencies')]()

var { foo, Foo } = ['foo', 'Foo'][ToFlags]()
assert.equal(foo, true)
assert.equal(Foo, true)

var { foo, Foo } = ['foo', 'Foo'][ToFlags]({ decapitalize: true })
assert.equal(foo, true)
assert.equal(Foo, undefined)

var { foo, Foo } = ['foo', 'Foo'][ToFlags]({ capitalize: true })
assert.equal(foo, undefined)
assert.equal(Foo, true)