var { assert,
  '@kingjs-interface': { Interface, Entries }
} = module[require('@kingjs-module/dependencies')]()

var FooA = Symbol('FooA')
var FooB = Symbol('FooB')
var Bar = Symbol('Bar')

class IFace extends Interface {
  static get bar() { return Bar }
  static get foo() { return [ FooA, FooB ] }
}

assert.deepEqual(
  IFace[Entries](), [
    { key: 'bar', value: Bar },
    { key: 'foo', value: [ FooA, FooB ] }
  ]
)