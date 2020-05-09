var { assert,
  '@kingjs': {
    '-reflect': { defineField }
  }
} = module[require('@kingjs-module/dependencies')]()

var target = defineField({ }, 'foo', { value: 1 })
assert.deepEqual(target.foo, { value: 1 })