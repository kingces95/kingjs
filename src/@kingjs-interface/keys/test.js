var { assert,
  '@kingjs-interface': { Interface, Keys }
} = module[require('@kingjs-module/dependencies')]()

var FooA = Symbol('FooA')
var FooB = Symbol('FooB')
var Bar = Symbol('Bar')

class IFace extends Interface {
  static get bar() { return Bar }
  static get foo() { return [FooA, FooB] }
}

assert.deepEqual(
  IFace[Keys]().sort(), 
  [ 'bar', 'foo' ]
)

