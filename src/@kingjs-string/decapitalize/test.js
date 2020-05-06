var { assert, 
  '@kingjs': { 
    '-string': { Decapitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

assert('Foo'[Decapitalize]() == 'foo');