var { assert,
  '@kingjs-interface': { Interface }
} = module[require('@kingjs-module/dependencies')]()

class IIterable extends Interface {
  static get Iterator() { return Symbol.iterator }
}

assert.ok({} instanceof IIterable == false)
assert.ok([] instanceof IIterable)
assert.ok([] instanceof IIterable)
assert.throws(() => new IIterable())

// test overloaded method
var FooA = Symbol('FooA')
var FooB = Symbol('FooB')

class IFoo extends Interface {
  static get Foo() { return [ FooA, FooB ] }
  static get foo() { return [ FooA, FooB ] }
}

var instance = {
  [FooA]: function foo() { },
  [FooB]: function foo() { },
}

assert.ok(instance instanceof IFoo)
