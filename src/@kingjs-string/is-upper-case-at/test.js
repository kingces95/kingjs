var { assert,
  '@kingjs': { 
    '-string': { IsUpperCaseAt }
  }
} = module[require('@kingjs-module/dependencies')]()

assert('Foo'[IsUpperCaseAt](0) == true)
assert('Foo'[IsUpperCaseAt](1) == false)