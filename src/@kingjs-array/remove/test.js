var { assert,
  '@kingjs': {
    '-array': { Remove },
  }
} = module[require('@kingjs-module/dependencies')]()

var array = [1, 2, 3]
array = array[Remove](2)
assert.deepEqual(array, [1, 3])