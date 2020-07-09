var { assert,
  '@kingjs-interface': { Interface, Map }
} = module[require('@kingjs-module/dependencies')]()

var FooA = Symbol('FooA')
var FooB = Symbol('FooB')
var Bar = Symbol('Bar')

class IFace extends Interface {
  static get Bar() { return Bar }
  static get Foo() { return [ FooA, FooB ] }
}

assert.deepEqual(
  IFace[Map](), {
    [FooA]: 'foo',
    [FooB]: 'foo',
    [Bar]: 'bar'
  }
)