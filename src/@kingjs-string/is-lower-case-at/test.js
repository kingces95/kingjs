var { assert,
  '@kingjs': { 
    '-string': { IsLowerCaseAt }
  }
} = module[require('@kingjs-module/dependencies')]()

assert('Foo'[IsLowerCaseAt](0) == false)
assert('Foo'[IsLowerCaseAt](1) == true)