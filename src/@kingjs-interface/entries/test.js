var { assert,
  '@kingjs': { 
    '-interface': { Interface, Entries }
  }
} = module[require('@kingjs-module/dependencies')]()

var FooA = Symbol('FooA')
var FooB = Symbol('FooB')
var Bar = Symbol('Bar')

class IFace extends Interface {
  static get Bar() { return Bar }
  static get Foo() { return [ FooA, FooB ] }
}

assert.deepEqual(
  IFace[Entries](), [
    { member: 'bar', symbol: Bar },
    { member: 'foo', symbol: [ FooA, FooB ] }
  ]
)