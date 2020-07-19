var { assert,
  '@kingjs': { 
    '-reflect': { isObject },
  },
} = module[require('@kingjs-module/dependencies')]()

assert.ok(!isObject(0))
assert.ok(isObject({}))