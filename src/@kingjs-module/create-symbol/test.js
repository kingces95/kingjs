var { assert,
  '@kingjs': {
    '-module': { CreateSymbol }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ex = module[CreateSymbol]()
console.log(Ex)
// Ex debug string is `@kingjs/ex, 1.0.0`

var Foo = module[CreateSymbol, 'foo']
console.log(Foo)
// Foo debug string is `@kingjs/ex.foo, 1.0.0`