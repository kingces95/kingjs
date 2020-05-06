var { assert,
  '@kingjs': { 
    '-string': { Expand }
  }
} = module[require('@kingjs-module/dependencies')]()


var result = 'foo'[Expand]()
assert(result == 'foo')