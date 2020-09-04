var { assert,
  '@kingjs': { 
    '-reflect': { isPojo },
  },
} = module[require('@kingjs-module/dependencies')]()

assert.ok(isPojo({}))
assert.ok(!isPojo([]))

var noPrototype = { }
Reflect.setPrototypeOf(noPrototype, null)
assert.ok(!isPojo(noPrototype))

class Foo { }
Foo.prototype.constructor = null
var foo = new Foo()
assert.ok(!isPojo(foo))