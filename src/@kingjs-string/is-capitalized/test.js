var { assert,
  '@kingjs': { 
    '-string': { IsCapitalized }
  }
} = module[require('@kingjs-module/dependencies')]()

assert('Foo'[IsCapitalized]() == true)
assert('foo'[IsCapitalized]() == false)
