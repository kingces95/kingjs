var { assert,
  '@kingjs': {
    '-property-descriptor': { rename }
  }
} = module[require('@kingjs-module/dependencies')]()

var foo = {
  value: function foo() { }
}
foo = rename.call(foo, '${name} (thunk)')
assert(foo.value.name == 'foo (thunk)')

var bar = {
  get: function getBar() { }, 
  set: function setBar(value) { }
}
bar = rename.call(bar, '${name} (stub)')
assert(bar.get.name == 'getBar (stub)')
assert(bar.set.name == 'setBar (stub)')
