var { assert,
  '@kingjs': { 
    '-reflect': { isArray },
  },
} = module[require('@kingjs-module/dependencies')]()

assert.ok(isArray([]))
assert.ok(!isArray({}))