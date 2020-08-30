var { assert, 
  '@kingjs': {
    EmptyArray
  }
} = module[require('@kingjs-module/dependencies')]()

assert.ok(EmptyArray.length === 0)
assert.ok(Object.isFrozen(EmptyArray))