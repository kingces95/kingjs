var { assert,
  '@kingjs': {
    '-array': { RemoveAt },
  }
} = module[require('@kingjs-module/dependencies')]()

var array = [1, 2, 3]
assert(2 == array[RemoveAt](1))
assert.deepEqual(array, [1, 3])