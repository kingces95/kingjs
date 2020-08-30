var { assert, 
  '@kingjs': {
    EmptyObject
  }
} = module[require('@kingjs-module/dependencies')]()

assert.ok(Object.keys(EmptyObject).length == 0)
assert.ok(Object.isFrozen(EmptyObject))