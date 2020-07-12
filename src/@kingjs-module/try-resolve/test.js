var { assert,
  '@kingjs': {
    '-module': { TryResolve }
  }
} = module[require('@kingjs-module/dependencies')]()

var cwd = process.cwd()
var version = process.version
 
var actual = module[TryResolve](cwd)
assert(actual, cwd)