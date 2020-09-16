var { assert,
  '@kingjs': { 
    '-string': { reflector }
  }
} = module[require('@kingjs-module/dependencies')]()

var { foo, Foo } = reflector()
assert.equal(foo, 'foo')
assert.equal(Foo, 'Foo')

var { foo, Foo } = reflector({ decapitalize: true })
assert.equal(foo, 'foo')
assert.equal(Foo, 'foo')

var { foo, Foo } = reflector({ capitalize: true })
assert.equal(foo, 'Foo')
assert.equal(Foo, 'Foo')