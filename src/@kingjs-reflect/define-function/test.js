var { assert,
  '@kingjs': {
    '-reflect': { defineFunction }
  }
} = module[require('@kingjs-module/dependencies')]()

var target = defineFunction({ bar: 1 }, 'foo', 'this.bar')
assert(target.foo() == 1)