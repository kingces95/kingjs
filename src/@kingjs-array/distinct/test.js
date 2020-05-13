var { assert,
  '@kingjs': {
    '-array': { Distinct }
  }
} = module[require('@kingjs-module/dependencies')]()

var array = [0, 0]
assert.deepEqual(array[Distinct](), [0])
assert.deepEqual(array[Distinct](), [0])
assert.deepEqual(array, [0, 0])