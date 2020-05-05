var { assert,
  '@kingjs': {
    '-array': { Peek }
  }
} = module[require('@kingjs-module/dependencies')]()

var array = [1, 2, 3];
assert.ok(3, array[Peek]());