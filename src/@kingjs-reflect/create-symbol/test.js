var { assert,
  '@kingjs': {
    '-reflect': { createSymbol }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ex = createSymbol(module)
console.log(Ex)
// Ex debug string is `@kingjs/ex, 1.0.0`

var Foo = createSymbol(module, 'foo')
console.log(Foo)
// Foo debug string is `@kingjs/ex.foo, 1.0.0`