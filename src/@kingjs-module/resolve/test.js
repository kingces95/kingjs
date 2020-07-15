var { assert,
  '@kingjs': {
    '-module': { Resolve }
  }
} = module[require('@kingjs-module/dependencies')]()

var cwd = process.cwd()

var expected = require.resolve(cwd)
var actual = module[Resolve](cwd)
assert(actual, expected)