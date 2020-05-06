var { assert,
  '@kingjs': {
    '-string': { Capitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

assert('foo'[Capitalize]() == 'Foo')