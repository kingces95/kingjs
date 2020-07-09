var { assert,
  '@kingjs': {
    '-module': { ExportEnum }
  }
} = module[require('@kingjs-module/dependencies')]()

module[ExportEnum]([
  'Foo',
  'Bar',
])

var MyEnum = module.exports
var { Foo, Bar } = MyEnum

assert.ok(Foo instanceof MyEnum)
assert.ok(Bar instanceof MyEnum)