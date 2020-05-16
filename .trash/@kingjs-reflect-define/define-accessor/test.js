var { assert,
  '@kingjs': {
    '-reflect': { defineFunction }
  }
} = module[require('@kingjs-module/dependencies')]()

var target = defineFunction({ bar: 1 }, 
  function foo() { return this.bar },
  function(value) { return this.bar = value }
)
assert(target.foo == 1)
target.foo = 2
assert(target.bar == 2)
assert(target.propertyIsEnumerable('foo'))

var target = defineFunction({ bar: 1 }, 'foo', 
  function() { return this.bar },
  function(value) { this.bar = value }
)
assert(target.foo == 1)
target.foo = 2
assert(target.bar == 2)
assert(target.propertyIsEnumerable('foo'))

var target = defineFunction({ bar: 1 }, 'foo', 
  'this.bar', 
  'this.bar = value'
)
assert(target.foo == 1)
target.foo = 2
assert(target.bar == 2)
assert(target.propertyIsEnumerable('foo'))
